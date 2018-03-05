# vue-cli多页面应用

> 因为[原作者](https://github.com/breezefeng/vue-cli-multipage)貌似不再更新这个多页面配置了，于是我自己来把这个更新了，后期要是vue-cli更新的话我也会同步更新的

## tip
1. 如果想新建页面的话需要在`src/module`里新建文件夹，且文件夹里必须包括一个.html文件，.js文件，.vue文件作为入口文件
2. `npm run dev`的时候提示打开localhost:8080，会发现一个404页面，这个时候在浏览器中的url追加上（以我目前的目录结构示例）`module/index`或者`module/other`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
