import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import svgLoader from 'vite-svg-loader'
// 自动导入，暂时无用，以后在研究吧
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  // envDir: 'env',
  plugins: [
    vue(),
    // createSvgIconsPlugin({
    //   iconDirs: [
    //     resolve(process.cwd(), './src/assets/svg')
    //   ],
    //   // symbolId: 'icon-[dir]-[name]'
    // })
    // Components({
    //   resolvers: [
    //     AntDesignVueResolver({
    //       // importStyle: 'css', // 自动导入 CSS
    //       // 如果你使用 less 作为样式语言，改为：
    //       importStyle: 'less',
    //       resolveIcons: true,
    //       resolveStyle: (name) => {
    //         return `ant-design-vue/lib/${name}/style/index.less`;
    //       },
    //     }),
    //   ],
    //   // dirs: ['src/components'], // 扫描组件的目录，根据项目结构调整
    //   // extensions: ['vue'],
    //   // dts: 'src/components.d.ts',// 生成类型声明文件
    // }),
    svgLoader(),
  ],
  // less
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         // 自定义主题变量（可选）
  //         'primary-color': '#1DA57A',
  //       },
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '*': resolve('')
    },
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
  }
  ,
  // npm run build打包后，运行npm run preview
  preview: {
    port: 5173,
    host: true,
    open: false
  }
  ,
  // npm run dev
  server: {
    port: 5173,
    host: true,
    open: false,
    cors: true,
    // https: true,
    proxy: {
      '/*': {
        target: 'http://localhost:30483',
        changeOrigin: true
      }
    }
    // 本地

  }

});
