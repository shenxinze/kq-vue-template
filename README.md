# kq-vue-template

一个基于 Vue 3 和 Vite 的前端项目模板，用于减少重复创建项目和配置项目的工作量。

## 分支说明

| 分支            | 技术栈                    | 说明                                                                                     |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| `main`          | Vue 3 + TypeScript + Vite | 基础 TypeScript 版本                                                                     |
| `develop`       | Vue 3 + TypeScript + Vite | 在 `main` 基础上增加可视化配置，包含 `flexible.js`、`postcss-pxtorem` 和 `amfe-flexible` |
| `main-no-ts`    | Vue 3 + JavaScript + Vite | 不包含 TypeScript 的基础 JavaScript 版本                                                 |
| `develop-no-ts` | Vue 3 + JavaScript + Vite | 不包含 TypeScript，并在 `main-no-ts` 基础上增加可视化配置                                |

## 基础依赖

- axios
- pinia
- sass
- Element Plus
- @element-plus/icons-vue
- ECharts
- dayjs
- autoprefixer

`develop` 和 `develop-no-ts` 分支额外包含：

- postcss-pxtorem
- amfe-flexible

## 使用 degit 安装

```sh
npm install -g degit
```

## 使用方法

默认使用 `main` 分支：

```sh
degit https://github.com/shenxinze/kq-vue-template.git
```

使用 `develop` 分支：

```sh
degit https://github.com/shenxinze/kq-vue-template.git#develop
```

使用不包含 TypeScript 的 `main-no-ts` 分支：

```sh
degit https://github.com/shenxinze/kq-vue-template.git#main-no-ts
```

使用不包含 TypeScript 且包含可视化配置的 `develop-no-ts` 分支：

```sh
degit https://github.com/shenxinze/kq-vue-template.git#develop-no-ts
```
