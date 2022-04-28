
/**
 * 递归树
 * @param list
 * @returns {*}
 */
export const deepTree = (list) => {
    let newList = []
    let map = {}

    list.forEach((e) => (map[e.id] = e))

    list.forEach((e) => {
        let parent = map[e.parentId]

        if (parent) {
            ;(parent.children || (parent.children = [])).push(e)
        } else {
            if (!e.parentId) {
                newList.push(e)
            }
        }
    })
    const fn = (list) => {
        list.map((e) => {
            if (e.children instanceof Array) {
                e.children = orderBy(e.children, 'id')
                fn(e.children)
            }
        })
    }
    fn(newList)
    return orderBy(newList, 'id')
}

/**
 * 排序
 * @param list
 * @param key
 * @returns {*}
 */
export function orderBy(list, key) {
    return list.sort((a, b) => a[key] - b[key])
}