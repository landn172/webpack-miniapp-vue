# webpack-miniapp-vue

## 说明

基于 mpvue 官方[quickstart](https://github.com/mpvue/mpvue-quickstart)封装编译编译部分代码为了开箱即用、统一编译（方便日后升级）,不用每个项目都引入**build/**

### 支持 h5 编译

**v1.2.0** 起支持 h5 编译支持

开启方式：设置环境变量 **PLATFORM_ENV=h5**

example: package.json

```json
{
  "scripts": {
    "watch:h5": "cross-env PLATFORM_ENV=h5 wmv dev"
  }
}
```

html模板默认会读取当前目录的**index.html**

## 配置

在根目录下添加 **wmv.config.js**

```js
// 入口文件根据不同项目配置不同入口
// TODO: entry默认根据官方配置文件目录结构
const entry = {
  app: "..."
  // ...
};

module.exports = {
  // webpack 配置会merge覆盖默认配置
  webpack: {
    entry
  }
};
```

## install

```cmd
npm install --save-dev @tuhu/webpack-miniapp-vue
```

## 示例

start.js

```js
const { dev, build } = require("@tuhu/webpack-miniapp-vue");
dev(); // run dev
```

cli

```bash
wmv dev #run dev
wmv build #build production
```
