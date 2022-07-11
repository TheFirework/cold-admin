import {useRoute, useRouter} from "vue-router";
import {useStore} from "../../store";

export default function useCore(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    return {
        route,
        router,
        store,
    }
}