# /bin/bash
###
# @Descripttion:
# @version:
# @Author: 陶帅星
# @Date: 2023-07-11 16:15:24
# @LastEditors: 陶帅星
# @LastEditTime: 2023-07-11 16:36:47
###
# 删除dist, 否则第二次会提示fatal: A branch named 'main' already exists.
rm -rf dist
# 确保脚本抛出遇到的错误
set -e

# 重新打包组件库
npm run build

rm -rf docs/.vitepress/dist
# 打包生成静态文件
npm run docs:build

# 进入待发布的 dist/ 目录
cd docs/.vitepress/dist

# 提交打包静态网站到 github-pages 分支
git init
git add .
git commit -m 'deploy'

# 部署到 https://<username>.github.io/<repo>
git push -f git@github.com:Taoshuaixing/vite-nice-ui.git main:github-pages

# 提交所有代码到github
cd ../../../
git add .
git commit -m 'update'
git push
