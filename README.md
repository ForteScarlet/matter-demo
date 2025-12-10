# matter-demo

基于 Vite + Vue 3 + TypeScript 的项目模版（使用 pnpm）。

## 要求
- Node.js 建议使用 >=18（LTS）
- pnpm（全局安装）：`npm i -g pnpm`

## 安装
使用 pnpm 安装依赖（会安装 package.json 中的 `latest` 依赖）：
```bash
pnpm install
```

## 常用命令
- 启动开发服务器：pnpm dev
- 生产构建：pnpm build
- 预览构建产物：pnpm preview
- 类型检查：pnpm type-check
- 运行 eslint（如果配置了）：pnpm lint

## 目录结构
- index.html
- src/
  - main.ts
  - App.vue
  - components/
    - HelloWorld.vue
  - shims-vue.d.ts
- vite.config.ts
- tsconfig.json
- package.json

## 后续建议
- 如果想锁定具体版本，把 package.json 中的 `latest` 换为想要的具体版本号，然后运行 pnpm install。
- 根据需要添加 ESLint/Prettier 的配置文件、GitHub Actions CI、测试（Vitest）等。
- 若需要 monorepo（多包）结构，可加入 pnpm-workspace.yaml.
