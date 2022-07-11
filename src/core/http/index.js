import axios from 'axios'
import {ElMessage} from "element-plus";
import config from "../../config";
import router from "../../router";
import cache from "../utils/cache";

const pendingMap = new Map();

function request(options, customOptions) {
    const baseOptions = Object.assign({
        repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
        error_message_show: true, // 是否开启接口错误信息展示,默认为true
        reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
        code_message_show: true, // 是否开启code不为200时的信息提示, 默认为false
    }, customOptions)

    const service = axios.create({
        ...config
    })

    service.interceptors.request.use(request => {
        removePending(request);
        baseOptions.repeat_request_cancel && addPending(request);
        let token = cache.get('token')
        if (token) {
            request.headers['access_token'] = token
        }
        return request
    }, error => {
        return Promise.reject(error)
    })

    service.interceptors.response.use(response => {
        removePending(response.config);

        if (baseOptions.code_message_show && response.data && response.data.code !== 10000) {
            ElMessage.error(response.data.msg)
            customErrorCodeHandle(response.data)
            return Promise.reject(response.data);
        }

        return baseOptions.reduct_data_format ? response.data : response;
    }, error => {
        error.config && removePending(error.config);
        baseOptions.error_message_show && httpErrorStatusHandle(error);
        return Promise.reject(error)
    })

    return service(options)
}

export default request

/**
 * 处理自定义异常错误
 * @param data
 */
function customErrorCodeHandle(data) {
    switch (data.code) {
        case 10002:
            ElMessage({
                type:'error',
                message:'登录失效，请重新登录！',
                onClose:()=>{
                    router.push('/login')
                }
            })
            break;
    }
}

/**
 * 处理错误状态码
 * @param error
 */
function httpErrorStatusHandle(error) {
    // 处理被取消的请求
    if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
    let message = '';
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = '接口重定向了！';
                break;
            case 400:
                message = '参数不正确！';
                break;
            case 401:
                message = '您未登录，或者登录已经超时，请先登录！';
                break;
            case 403:
                message = '您没有权限操作！';
                break;
            case 404:
                message = `请求地址出错: ${error.response.config.url}`;
                break;
            case 408:
                message = '请求超时！';
                break;
            case 409:
                message = '系统已存在相同数据！';
                break;
            case 500:
                message = '服务器内部错误！';
                break;
            case 501:
                message = '服务未实现！';
                break;
            case 502:
                message = '网关错误！';
                break;
            case 503:
                message = '服务不可用！';
                break;
            case 504:
                message = '服务暂时无法访问，请稍后再试！';
                break;
            case 505:
                message = 'HTTP版本不受支持！';
                break;
            default:
                message = '异常问题，请联系管理员！';
                break
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！';
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

    ElMessage({
        type: 'error',
        message
    })
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
        }
    });
}

/**
 * 删除重复的请求
 * @param config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey);
    }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param config
 * @returns {string}
 */
function getPendingKey(config) {
    let {url, method, params, data} = config;
    if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}