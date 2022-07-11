import {defineStore} from "pinia";
import store from "./index";

export const useTagViewStore = defineStore({
    id: 'tagView',
    state: () => ({
        list: [
            {
                value:'/',
                label:'首页',
                name:'index',
                keepAlive: false,
                active: true,
            }
        ],
    }),
    actions:{
        addTag(item){
            const index = this.list.findIndex(
                (e) => e.value.split('?')[0] === item.value.split('?')[0]
            )

            this.list.map((e) => {
                e.active = e.value === item.value
            })

            if (item.value === '/') {
                item.label = '首页'
                item.name = 'index'
                item.value = '/'
                item.keepAlive = false
                item.active = true
            }

            if (index < 0) {
                if (item.label) {
                    this.list.push({
                        ...item,
                        active: true,
                    })
                }
            } else {
                this.list[index].active = true
                this.list[index].keepAlive = item.keepAlive || false
                this.list[index].label = item.label
                this.list[index].value = item.value
                this.list[index].name = item.name
            }
        },
        set(list){
            this.list = list
        },
        remove(index){
            this.list.splice(index, 1)
        },
        clear(){
            this.list = [
                {
                    label: '首页',
                    value: '/',
                    keepAlive: false,
                    active: true,
                    name: 'index',
                }
            ]
        },
    },
})

export default function useTagViewStoreInstance() {
    return useTagViewStore(store)
}
