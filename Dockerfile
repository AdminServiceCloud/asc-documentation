# Self-hosted docs site: the VitePress build served as static files by nginx.
# Used by compose.yaml (e.g. docs.adminservice.cloud under ASC); GitHub Pages
# keeps deploying through .github/workflows/deploy.yml.

# -- build: install dependencies and build the static site ---------------------
FROM node:22-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11.10.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Only what the build needs.
COPY tsconfig.json postcss.config.js components.json ./
COPY lib ./lib
COPY docs ./docs

# The site must be built for the root of its own domain: these guards refuse
# to publish a build with a GitHub Pages sub-path base.
RUN set -eux; \
    cfg=docs/.vitepress/config.ts; \
    grep -q 'base: "/"' "$cfg"; \
    grep -q 'href: "/screenshots/' "$cfg"; \
    ! grep -q '"/asc-documentaion/' "$cfg"

ENV NODE_ENV=production
# docs:build fails on dead links — that is the build check.
RUN pnpm docs:build

# -- runner: nginx serves the built site ---------------------------------------
FROM nginx:1.27-alpine AS runner
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html

# cleanUrls: pages live as /cli/api.html while links point to /cli/api; plus
# VitePress' own 404 page.
RUN printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    server_name _;' \
    '    root /usr/share/nginx/html;' \
    '    index index.html;' \
    '' \
    '    # Hashed VitePress assets are immutable.' \
    '    location /assets/ {' \
    '        expires 1y;' \
    '        add_header Cache-Control "public, immutable";' \
    '        try_files $uri =404;' \
    '    }' \
    '' \
    '    # =404 (not /404.html directly): otherwise the 404 page is served as 200.' \
    '    location / {' \
    '        try_files $uri $uri.html $uri/index.html =404;' \
    '    }' \
    '' \
    '    error_page 404 /404.html;' \
    '    location = /404.html {' \
    '        internal;' \
    '    }' \
    '' \
    '    gzip on;' \
    '    gzip_types text/css application/javascript application/json image/svg+xml;' \
    '    gzip_min_length 1024;' \
    '}' \
    > /etc/nginx/conf.d/default.conf \
    && nginx -t

EXPOSE 80
