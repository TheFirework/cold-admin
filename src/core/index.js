import {useRouteStoreInstance} from "../store/route";
import {addRoutes} from "../router";

export default async function bootstrap() {
    const routeStore = useRouteStoreInstance()
    addRoutes(routeStore.routes)
}