import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import {viteMockServe} from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/variables.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            dirs: ['src/components'],
            resolvers: [
                ElementPlusResolver({
                    importStyle: "sass",
                }),
            ],
        }),

        viteMockServe({
            mockPath: "mock",   // 解析根目录下的mock文件夹
            localEnabled: true,  // 开发打包开关
            prodEnabled: false, // 生产打包开关
            supportTs: false, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
            watchFiles: true, // 监视文件更改
        }),
    ],
})
