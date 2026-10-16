# 📚 AdminService.Cloud Docs

[![CI](https://github.com/AdminServiceCloud/asc-documentation/actions/workflows/ci.yml/badge.svg)](https://github.com/AdminServiceCloud/asc-documentation/actions/workflows/ci.yml)
[![Deploy](https://github.com/AdminServiceCloud/asc-documentation/actions/workflows/deploy.yml/badge.svg)](https://github.com/AdminServiceCloud/asc-documentation/actions/workflows/deploy.yml)

## 📌 About

The public documentation site for the [AdminService.Cloud](https://adminservice.cloud) project: the [asc-daemon](https://github.com/AdminServiceCloud/asc-daemon) CLI and the platform built on top of it. Built with [VitePress](https://vitepress.dev), deployed to GitHub Pages. English and Russian content side by side (`docs/` and `docs/ru/`).

- 🌐 Main site: [docs.adminservice.cloud](https://docs.adminservice.cloud)

## 🗂️ Structure

| Path | Description |
|---|---|
| [docs/cli/](docs/cli) | CLI (asc-daemon) module docs — English |
| [docs/commands/](docs/commands) | Command reference — one page per top-level `asc` command, linked from `asc <cmd> --help` |
| [docs/platform/](docs/platform) | Platform docs (in development) |
| [docs/ru/](docs/ru) | Russian mirror of `cli/`, `commands/` and `platform/` |
| [docs/.vitepress/](docs/.vitepress) | VitePress config, theme and components |

> ⚠️ This site is a **mirror**, not a build artifact: CLI module docs and command reference pages are the source of truth in [asc-daemon](https://github.com/AdminServiceCloud/asc-daemon)'s `docs/english/` and `docs/russian/`, copied here by hand on every change (see `asc-daemon`'s [AGENTS.md](https://github.com/AdminServiceCloud/asc-daemon/blob/main/AGENTS.md)). Adding, removing or renaming a command requires a matching page/heading update here in the same change, or the printed `--help` links 404.

## ⌨️ Local development

Requires [pnpm](https://pnpm.io) and, optionally, [Task](https://taskfile.dev) (`go install github.com/go-task/task/v3/cmd/task@latest`) to run the shortcuts below.

```bash
task install
task dev
```
> 📥 install dependencies, 🚀 run the VitePress dev server

```bash
task build
```
> 📦 build the static site — also fails the build on dead links

```bash
task preview
```
> 👀 build, then preview the production output locally

Without Task, the same commands are `pnpm install`, `pnpm docs:dev`, `pnpm docs:build`, `pnpm docs:preview`. Run `task` (no arguments) to list all available commands.

## 🚀 Deployment

Every push to `main` builds the site and deploys it to GitHub Pages via `.github/workflows/deploy.yml`; every pull request runs `.github/workflows/ci.yml` to make sure the build (including link checking) still passes.

Self-hosted copy (docs.adminservice.cloud): `docker compose up -d --build` builds the same site into an nginx image (`Dockerfile`, `compose.yaml`) and publishes it on `127.0.0.1:8080`; set `HTTP_PORT` / `HTTP_BIND` in `.env` and put a TLS reverse proxy in front.

## 🤝 Contributing

Follow the documentation conventions from [asc-daemon](https://github.com/AdminServiceCloud/asc-daemon)'s [AGENTS.md](https://github.com/AdminServiceCloud/asc-daemon/blob/main/AGENTS.md): English-first, Russian mirrored, emoji in headings, commits in English following [Conventional Commits](https://www.conventionalcommits.org/).

## 📄 License

Documentation content and site source are part of the [AdminService.Cloud](https://adminservice.cloud) project by **Omar El Sayed** ([@statebyte](https://github.com/statebyte)), [Anytecture Software](https://anytecture.com).
