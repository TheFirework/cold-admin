import request from "../core/http";

export default class FileService {
    static async uploadFile(data) {
        return request({
            method: 'POST',
            url: '/upload/file',
            data
        })
    }
}