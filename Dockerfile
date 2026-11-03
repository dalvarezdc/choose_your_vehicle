# syntax=docker/dockerfile:1
# Default target: Node server (dashboard + JSON API + SQLite).
# `--target static`: nginx serving the dashboard only (uses the bundled data snapshot).

FROM node:24-alpine AS build
WORKDIR /app
# pnpm via corepack (version pinned by "packageManager" in package.json). No npm.
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build && pnpm prune --prod

FROM nginx:1.27-alpine AS static
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]

# Node 24 runs the TypeScript server directly (type stripping) and ships node:sqlite.
FROM node:24-alpine AS server
WORKDIR /app
ENV NODE_ENV=production PORT=8787 DATABASE_PATH=/app/data/vehicles.db
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src/data ./src/data
RUN mkdir -p /app/data && chown -R node:node /app/data
USER node
VOLUME ["/app/data"]
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8787/api/health >/dev/null || exit 1
# Migrates and (re)seeds automatically on start when src/data changed.
CMD ["node", "server/index.ts"]
