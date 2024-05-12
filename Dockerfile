FROM node:alpine

WORKDIR /src/app
COPY package.json .
COPY tsconfig.json .

RUN npm i -g typescript
RUN npm i -g ts-node
RUN npm i -g pnpm
RUN pnpm install -r
COPY . .

RUN pnpm run build-ts
CMD pnpm run start-ts