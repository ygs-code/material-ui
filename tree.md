ot-system-client
├── Dockerfile
├── README.md
├── README2.md
├── bin
│   ├── cmd.js
│   └── index.js
├── client
│   ├── App
│   │   ├── index.js
│   │   └── index.less
│   ├── assets
│   │   ├── css
│   │   │   └── base.less
│   │   ├── img
│   │   │   ├── 404.png
│   │   │   ├── back.jpeg
│   │   │   ├── word.jpg
│   │   │   └── word1.png
│   │   └── js
│   │       └── request
│   │           ├── XMLHttpRequest.js
│   │           ├── baseUrl.js
│   │           ├── filterGraphqlData.js
│   │           ├── index.js
│   │           ├── redirect.js
│   │           ├── request.js
│   │           ├── requestApi.js
│   │           ├── requestMessage.js
│   │           └── token.js
│   ├── component
│   │   ├── 404
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── AccountMenu
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Actions
│   │   │   └── index.js
│   │   ├── Breadcrumb
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── CheckAuth
│   │   │   └── index.js
│   │   ├── Codemirror
│   │   │   └── index.js
│   │   ├── Dialog
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Form
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Form1
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── FormItem
│   │   │   └── index.js
│   │   ├── FormPage
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── FormValidator
│   │   │   └── index.js
│   │   ├── Grain
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Head
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Header
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Header copy
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Layout
│   │   │   ├── Main.js
│   │   │   ├── Sider.js
│   │   │   └── index.js
│   │   ├── Layout1
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── LazyLoadingImg
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── LazySelect
│   │   │   └── index.js
│   │   ├── Loading
│   │   │   └── index.js
│   │   ├── Menu
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Menu copy
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Menu copy 2
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Message
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Nav
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Table
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── TableButton
│   │   │   ├── README.md
│   │   │   ├── index.jsx
│   │   │   └── styles.less
│   │   ├── TablePage
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── TablePicker
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Tabs
│   │   │   └── index.js
│   │   ├── TreePicker
│   │   │   ├── README.md
│   │   │   ├── TreeContent.js
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   ├── VerificationCode
│   │   │   └── index.js
│   │   ├── lazy
│   │   │   └── index.js
│   │   ├── setBreadcrumbAndTitle
│   │   │   └── index.js
│   │   └── setMetaProps
│   │       └── index.js
│   ├── favicon.ico
│   ├── index.js
│   ├── modules
│   │   └── otServe
│   │       ├── README.md
│   │       ├── lib
│   │       │   ├── client
│   │       │   │   └── index.js
│   │       │   ├── db
│   │       │   │   └── index.js
│   │       │   └── server
│   │       │       └── index.js
│   │       └── package.json
│   ├── pages
│   │   ├── Drawer
│   │   │   ├── Dropdown.js
│   │   │   ├── Header.js
│   │   │   ├── Main.js
│   │   │   ├── Sider.js
│   │   │   └── index.js
│   │   ├── Home
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Index
│   │   │   ├── index.js
│   │   │   ├── pages
│   │   │   │   ├── Desktop
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── index.less
│   │   │   │   └── office
│   │   │   │       ├── index.js
│   │   │   │       ├── pages
│   │   │   │       └── router
│   │   │   └── router
│   │   │       └── routesConfig.js
│   │   ├── LogIn
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── Register
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   └── router
│   │       └── routesConfig.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   └── logo512.png
│   ├── redux
│   │   ├── Store.js
│   │   ├── index.js
│   │   └── models
│   │       ├── breadcrumb.js
│   │       ├── head.js
│   │       ├── home.js
│   │       ├── index.js
│   │       ├── nav.js
│   │       └── user.js
│   ├── router
│   │   ├── Routers.js
│   │   ├── addRouterApi.js
│   │   ├── history.js
│   │   ├── historyPush.js
│   │   ├── index.js
│   │   ├── react-lazy-router-dom
│   │   │   ├── Route.js
│   │   │   ├── Router.js
│   │   │   ├── Switch.js
│   │   │   ├── index.js
│   │   │   ├── lazy.js
│   │   │   ├── matchPath.js
│   │   │   ├── path-to-regexp
│   │   │   │   └── index.js
│   │   │   └── withRouter.js
│   │   ├── routePaths.js
│   │   ├── routesComponent.js
│   │   └── toComponent.js
│   ├── static
│   │   ├── 1
│   │   │   └── 2.txt
│   │   ├── 3.txt
│   │   ├── a.js
│   │   ├── b.js
│   │   ├── c.js
│   │   ├── d.js
│   │   ├── img
│   │   │   ├── back.jpeg
│   │   │   └── logo512.png
│   │   └── js
│   │       └── errCatch.js
│   └── utils
│       ├── CheckDataType.js
│       ├── FloatingBall.js
│       ├── SubscribePublished.js
│       ├── createStore.js
│       ├── ergodic.js
│       ├── getBaseInitState.js
│       ├── getCssAttr.js
│       ├── index.js
│       ├── regular.js
│       ├── resolvePath.js
│       ├── stringToObject.js
│       ├── throttlingStabilization.js
│       └── transformRoutePaths.js
├── dist
│   ├── client
│   │   ├── assets-manifest.json
│   │   └── index.html
│   └── server
├── htmllinter.config.js
├── index.html
├── nginx
│   ├── nginx.conf
│   └── templates
│       ├── default.conf copy.template
│       └── default.conf.template
├── nodemon.json
├── package.json
├── server
│   ├── app.js
│   ├── controller
│   │   ├── home.js
│   │   └── user.js
│   ├── index.js
│   ├── middleware
│   │   ├── clientRouter
│   │   │   ├── index.js
│   │   │   └── otherModules.js
│   │   ├── index.js
│   │   └── webpackHot
│   │       └── index.js
│   ├── router
│   │   ├── api.js
│   │   └── index.js
│   ├── service
│   │   └── user.js
│   └── utils
│       ├── copyFile.js
│       ├── index.js
│       ├── readFile.js
│       └── watchFile.js
├── stylelint.config.js
├── tree.md
├── webpack
│   ├── config
│   │   ├── client
│   │   │   ├── index.js
│   │   │   ├── webpack.base.config.js
│   │   │   ├── webpack.dev.config.js
│   │   │   ├── webpack.prod.config.js
│   │   │   └── webpack.server.config.js
│   │   └── server
│   │       ├── index.js
│   │       ├── webpack.base.config.js
│   │       ├── webpack.dev.config.js
│   │       └── webpack.prod.config.js
│   ├── defineLoader
│   │   └── MyExampleWebpackLoader.js
│   ├── definePlugin
│   │   ├── HelloWorldCheckerPlugin
│   │   │   └── index.js
│   │   ├── MyExampleWebpackPlugin.js
│   │   ├── mini-css-extract-plugin
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── cjs
│   │   │   │   ├── cjs.js
│   │   │   │   ├── hmr
│   │   │   │   │   ├── hotModuleReplacement.js
│   │   │   │   │   └── normalize-url.js
│   │   │   │   ├── index.js
│   │   │   │   ├── loader-options.json
│   │   │   │   ├── loader.js
│   │   │   │   ├── plugin-options.json
│   │   │   │   └── utils.js
│   │   │   └── package.json
│   │   ├── react-loadable
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── babel.js
│   │   │   ├── lib
│   │   │   │   ├── babel.js
│   │   │   │   ├── index.js
│   │   │   │   └── webpack.js
│   │   │   ├── package.json
│   │   │   └── webpack.js
│   │   ├── react-loadable-ssr-addon
│   │   │   ├── AUTHORS.md
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── example
│   │   │   │   ├── client.jsx
│   │   │   │   ├── components
│   │   │   │   │   ├── App.jsx
│   │   │   │   │   ├── Content.jsx
│   │   │   │   │   ├── ContentNested.jsx
│   │   │   │   │   ├── Header.jsx
│   │   │   │   │   ├── Loading.js
│   │   │   │   │   └── multilevel
│   │   │   │   └── server.js
│   │   │   ├── lib
│   │   │   │   ├── ReactLoadableSSRAddon.js
│   │   │   │   ├── ReactLoadableSSRAddon.test.js
│   │   │   │   ├── getBundles.js
│   │   │   │   ├── getBundles.test.js
│   │   │   │   ├── index.js
│   │   │   │   └── utils
│   │   │   │       ├── computeIntegrity.js
│   │   │   │       ├── getFileExtension.js
│   │   │   │       ├── getFileExtension.test.js
│   │   │   │       ├── hasEntry.js
│   │   │   │       ├── hasEntry.test.js
│   │   │   │       ├── index.js
│   │   │   │       ├── unique.js
│   │   │   │       └── unique.test.js
│   │   │   ├── package.json
│   │   │   ├── source
│   │   │   │   ├── ReactLoadableSSRAddon.js
│   │   │   │   ├── ReactLoadableSSRAddon.test.js
│   │   │   │   ├── getBundles.js
│   │   │   │   ├── getBundles.test.js
│   │   │   │   ├── index.js
│   │   │   │   └── utils
│   │   │   │       ├── computeIntegrity.js
│   │   │   │       ├── getFileExtension.js
│   │   │   │       ├── getFileExtension.test.js
│   │   │   │       ├── hasEntry.js
│   │   │   │       ├── hasEntry.test.js
│   │   │   │       ├── index.js
│   │   │   │       ├── unique.js
│   │   │   │       └── unique.test.js
│   │   │   └── webpack.config.js
│   │   ├── webpack-plugin-copy-file
│   │   │   └── index.js
│   │   ├── webpack-plugin-no-require-css
│   │   │   └── index.js
│   │   ├── webpack-plugin-resolve-alias
│   │   │   └── index.js
│   │   └── webpack-plugin-router
│   │       ├── diff.js
│   │       └── index.js
│   ├── index.js
│   └── utils
│       ├── alias.js
│       ├── copyFile.js
│       ├── index.js
│       ├── readFile.js
│       ├── readWriteFiles.js
│       ├── stringToObject.js
│       ├── watchFile.js
│       └── writeFile.js
└── yarn.lock
