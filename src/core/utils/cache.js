const cache =  {
    /**
     * 设置
     * @param key 关键字
     * @param value 值
     * @param expires 到期时间 毫秒
     */
    set(key, value, expires = 0) {
        let source
        if (expires) {
            source = JSON.stringify({
                data: value,
                expires: Date.parse(String(new Date())) + expires * 1000,
            })
        } else {
            source = JSON.stringify({
                data: value,
                expires: 0,
            })
        }
        localStorage.setItem(key, source)
    },

    /**
     * 获取
     * @param key 关键字
     * @returns {null|*}
     */
    get(key) {
        let source
        let value = localStorage.getItem(key)
        source = value ? JSON.parse(value) : ''
        if (!source) {
            return null
        }
        return source.data
    },

    /**
     * 是否过期
     * @param key 关键字
     * @returns {boolean}
     */
    isExpired(key){
        let value = localStorage.getItem(key)
        let source = value ? JSON.parse(value) : ''
        return source.expires - Date.parse(String(new Date())) <= 0;
    },

    /**
     * 移除
     * @param key 关键字
     */
    remove(key) {
        localStorage.removeItem(key)
    },

    /**
     * 清理全部
     */
    clear() {
        localStorage.clear()
    }
}

export default cache