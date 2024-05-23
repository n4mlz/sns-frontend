ARG NODE_VERSION=21.6.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

FROM base as deps

COPY package.json . 
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

FROM base as build

COPY . .
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN npm install -g pnpm
RUN pnpm build

FROM base as prod

ENV NODE_ENV production
RUN npm install -g pnpm
USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY ./public ./public

CMD pnpm start
