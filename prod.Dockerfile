ARG NODE_VERSION=22.12

FROM node:${NODE_VERSION}-alpine as base

FROM base as deps

WORKDIR /app
COPY package.json . 
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

FROM base as build

WORKDIR /app
COPY . .
COPY package.json .
COPY --from=deps /app/node_modules ./node_modules
RUN npm install -g pnpm
RUN pnpm build

FROM base as prod

WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/standalone ./

CMD ["node", "server.js"]
