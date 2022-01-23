# multi-stage build
FROM node:14 as js-builder
WORKDIR /work
COPY app/package*.json app/tsconfig*.json app/yarn.lock app/prisma ./
COPY app ./
RUN yarn build-dev

FROM node:14
WORKDIR /work/dist
COPY --from=js-builder /work/dist ./
EXPOSE 5000
CMD ["node", "bundle.js"]
