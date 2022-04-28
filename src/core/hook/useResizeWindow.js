import {onBeforeUnmount, onMounted, reactive, toRefs} from "vue";
import {throttle} from "lodash";
import {getWindowHeight, getWindowWidth} from "../utils/dom";

export function useResizeWindow(fn){
    const state = reactive({
        width: getWindowWidth(),
        height: getWindowHeight()
    })

    function onResize() {
        state.width = getWindowWidth()
        state.height = getWindowHeight()
        fn()
    }

    const onResizeThrottled = throttle(onResize, 300)

    onMounted(() => {
        window.addEventListener('resize', onResizeThrottled)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResizeThrottled)
    })

    return {
        ...toRefs(state)
    }
}