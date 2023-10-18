import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import commonjs from '@rollup/plugin-commonjs';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //添加jsx/tsx支持
    vueJsx(),
    //解决引入commonjs模块后打包出现的{'default' is not exported by XXX}错误!!
    // commonjs({
    //   // requireReturnsDefault: true,
    //   include: 'node_modules/**', // Default: undefined
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
    extensions: ['.js', '.vue', '.json', '.ts', '.d.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  build: {
    //minify: false,
    lib: {
      entry: resolve(__dirname, 'install.ts'),
      name: 'szywBcVue',
      fileName: (format) => `szyw-bc-vue.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // format: 'umd',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
        assetFileNames: `assets/styles/szyw-bc-vue.style.css`, //决定打包后静态文件的路径及名称
      },
    },
  },
})
