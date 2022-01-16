#multi-stage build
FROM node:14 as js-builder
WORKDIR /work/app
COPY app/package*.json ./
COPY app/tsconfig*.json ./
COPY app ./
RUN yarn build-dev

FROM node:14
COPY --from=js-builder /work/app/dist /var/www/html/api
WORKDIR /var/www/html/api
EXPOSE 5000
CMD ["node", "bundle.js"]
