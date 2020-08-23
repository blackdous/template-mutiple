## vueteamplete-cli(mutiple)

feature-list:

- 如果想独立页面发布请自己判断配置

vue-mutiple

hashList:

- npm run dev || yarn dev 启动多页面
- npm run dev -- --PAGENAME=admin 启动 admin 页面 要通过映射路径/admin 才能访问（因为 router 为 history）
- npm run build -- --PAGENAME=index 只打包 index 页面
- npm run build || yarn build 正式环境打包
- npm run build -- --ENVIRONMENT=sit || npm run build -- --ENVIRONMENT=uat || npm run build -- --ENVIRONMENT=pre 打不同环境的包
- npm run build -- --PAGENAME=admin

TODOLIST:

- 支持多页面 但是文件目录要与示例一致
- npm run dev or yarn dev 本地开发 ✅
- npm run build or yarn build 打包配置 ✅
  - 分环境打包 build:sit、build:uat、build:pre、build:prod 环境 ✅
- npm run analyzer 分析打包节点时间、打包体积 ✅
- npm run start 运行本地打包好的文件 ✅
- babel 7.x、webpack 4.x ✅
- 支持 sass、less、stylus、postcss ✅
- eslint、husky、pre-commit 代码检测 ✅
- mock 功能 ❌
- router 规划 ✅
- vuex 基础封装 ✅
- smoke 冒烟测试 ✅
- 单元测试 jest ✅
  - npm run test or yarn test 执行单元测试 ✅
- 支持 typescript (ts-loader、tslint、ts-jest、fork-ts-checker-webpack-plugin) ✅
- 优化打包速度 terserPulgin/hardsourcewebpackpulgin、cache-lodaer、thread-lodaer/happypack 等等优化 ✅
- 添加 Etag、Gzip、serverworker ✅
- 部署为 npm 包，支持命令行交互 完成 vue-template-cli ✅
  - npm i vue-template-cli -g ✅
  - vuetemplate init templateName projectName ✅
- 定制自己的 loader、plugin❌，如懒加载 vuex state 中的数据 ✅、router 动态注册 ✅
