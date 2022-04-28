export const on = (element,event,handler) => {
    if (element && event) {
        element.addEventListener(event, handler, false)
    }
}

export const off = (element,event,handler) => {
    if (element && event) {
        element.removeEventListener(event, handler, false)
    }
}

export function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}