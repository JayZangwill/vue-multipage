# vue-cli 多页面应用

> 因为[原作者](https://github.com/breezefeng/vue-cli-multipage)貌似不再更新这个多页面配置了，于是我自己来把这个更新了，后期要是 vue-cli 更新的话我也会同步更新的

## 项目迁移

[原来](https://github.com/JayZangwill/vue-cli-multipage)的这个项目不再维护，因为是 fork 来的，没有 issues 功能，不利于后期维护，所以对项目做了迁移。

## 前言

这是用 vue-cli 2.9.3 版本`vue init webpack`命令生成的的应用，在此基础上加了些东西变成了多页面的

如果想看vue-cli 3.x及以上的版本请移步[v3分支](https://github.com/JayZangwill/vue-multipage/tree/v3)

## tip

1.  如果想新建页面的话需要在`src/module`里新建文件夹，且文件夹里必须包括一个.html 文件，.js 文件，.vue 文件作为入口文件
2.  `npm run dev`的时候提示打开 localhost:8080 即可
3.  为了方便维护`npm run build`出来的 html 文件是放在 module 文件夹里的
4. 如果想修改`src`里的`module`文件夹名字的话，需要将三个`config.js`配置文件里的getEntries函数的参数`module`改成你想改的名字，同时这个函数的函数体里的`module`也需要更改。

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080/module/index.html
npm run dev

# build for production with minification
npm run build
```

**重要：** 首页是localhost:8080/module/index.html 而不是localhost:8080

## 修改的地方

### webpack.base.conf.js

```javascript
//6行添加
const glob = require("glob");
const entry = getEntries("./src/module/**/*.js"); // 获得入口js文件

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function getEntries(path) {
  let entries = {};
  glob.sync(path).forEach(entry => {
    if (/(module\/(?:.+[^.]))/.test(entry)) {
      entries[RegExp.$1.replace(/\/\w+\b/, "")] = entry;
    }
  });
  return entries;
}
```

然后将`module.exports`里的 entry 改为我们定义的这个 ertry

### webpack.dev.conf.js

```javascript
//12行添加
const glob = require("glob");
const entry = getEntries("./src/module/**/*.js"); // 获得入口js文件

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

//90行添加
for (let pathname in entry) {
  //为了在开发环境下不用再多余输入module
  let filename = pathname.replace(/module\//, ""),
    conf = {
      filename: `${filename}.html`,
      template: entry[pathname],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    };
  if (pathname in devWebpackConfig.entry) {
    conf.chunks = ["manifest", "vendor", pathname];
    conf.hash = true;
  }
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

//最后添加
function getEntries(path) {
  let entries = {};
  glob.sync(path).forEach(entry => {
    if (/(module\/(?:.+[^.]))/.test(entry)) {
      entries[RegExp.$1.replace(/\/\w+\b/, "")] = entry;
    }
  });
  return entries;
}
```

### webpack.prod.con.js

```javascript
//13行添加
const glob = require("glob");
const entry = getEntries("./src/module/**/*.html"); // 获得入口hmtl文件

//在module.exports = webpackConfig前添加
for (let pathname in entry) {
  let conf = {
    filename: `${pathname}.html`,
    template: entry[pathname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: "dependency"
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ["manifest", "vendor", pathname];
    conf.hash = true;
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
//在module.exports = webpackConfig后添加
function getEntries(path) {
  let entries = {};
  glob.sync(path).forEach(entry => {
    if (/(module\/(?:.+[^.]))/.test(entry)) {
      entries[RegExp.$1.replace(/\/\w+\b/, "")] = entry;
    }
  });
  return entries;
}
```

## 更新

### 2018 5.15 更新config/index.js

修改build配置项下的`assetsPublicPath为'../'` 解决根路径问题

### 2018 7.27 更新build里的三个config.js

修改正则为/(module\/(?:.+[^.])，解决module重命名问题