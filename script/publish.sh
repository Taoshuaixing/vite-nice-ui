# /bin/bash
###
# @Descripttion:
# @version:
# @Author: 陶帅星
# @Date: 2023-07-11 13:57:28
# @LastEditors: 陶帅星
# @LastEditTime: 2023-07-11 16:55:55
###
# 删除dist, 否则第二次会提示fatal: A branch named 'main' already exists.
rm -rf dist
# 确保脚本抛出遇到的错误
set -e

# 读取package.json中的version
version=$(jq -r .version package.json)

# 打包构建
npm run build

# 发布到npm，pnpm(高性能的npm)
npm publish

# 升级 vite-nice-ui 依赖版本
npm update vite-nice-ui

# 提交版本更新代码到github
git add .
git commit -m "update $version"
git push
