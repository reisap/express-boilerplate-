FROM node:alpine

WORKDIR /src/app
COPY package.json .

RUN npm i -g typescript
RUN npm i -g ts-node
RUN npm i -g pnpm
RUN pnpm install -r
COPY . .

CMD pnpm run start-ts