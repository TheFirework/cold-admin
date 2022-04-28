/**
 * 修正路径
 * @param path
 * @returns {string|*}
 */
export const revisePath = (path) => {
    if (!path) {
        return ''
    }
    if (path[0] === '/') {
        return path
    } else {
        return `/${path}`
    }
}