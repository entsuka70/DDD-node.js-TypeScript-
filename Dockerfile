#single-stage build
# FROM node:14
# WORKDIR /work/app
# # キャッシュを効かせてdockerイメージビルドを早くさせるために先にコピー
# COPY app/package*.json ./
# COPY app/tsconfig*.json ./
# RUN yarn install
# # 改めてコピー
# COPY app ./


#multi-stage build
FROM node:14 as js-builder
WORKDIR /work/app
COPY app/package*.json ./
COPY app/tsconfig*.json ./
COPY app ./
RUN yarn build

FROM node:14
COPY --from=js-builder /work/app/dist /var/www/html/api
CMD ["node", "server.js"]
