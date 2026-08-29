import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitepress"

const cliSidebarEn = [
  {
    text: "CLI (asc-daemon)",
    items: [
      { text: "Overview", link: "/cli/" },
      { text: "Getting Started", link: "/cli/getting-started" },
      { text: "Add ASC support to a repository", link: "/cli/repository-support" },
      { text: "Create a custom registry", link: "/cli/custom-registry" },
      { text: "API: gRPC + REST", link: "/cli/api" },
      { text: "Security tokens", link: "/cli/security-tokens" },
      { text: "Application management", link: "/cli/app-management" },
      { text: "Package manager", link: "/cli/package-manager" },
      { text: "MCP server", link: "/cli/mcp-server" },
      { text: "Monitoring", link: "/cli/monitoring" },
      { text: "Backups", link: "/cli/backups" },
      { text: "SFTP", link: "/cli/sftp" },
      { text: "Console", link: "/cli/console" },
      { text: "Scheduler", link: "/cli/scheduler" },
      { text: "Updater", link: "/cli/updater" },
      { text: "Connecting to the platform", link: "/cli/platform" },
    ],
  },
  {
    text: "AI Integration",
    items: [
      { text: "MCP", link: "/ai-integration/mcp" },
      { text: "Skills", link: "/ai-integration/skills" },
    ],
  },
  {
    text: "Command reference",
    items: [
      { text: "Overview", link: "/commands/" },
      { text: "serve", link: "/commands/serve" },
      { text: "mcp", link: "/commands/mcp" },
      { text: "service", link: "/commands/service" },
      { text: "api", link: "/commands/api" },
      { text: "status", link: "/commands/status" },
      { text: "connect", link: "/commands/connect" },
      { text: "stats", link: "/commands/stats" },
      { text: "app", link: "/commands/app" },
      { text: "ls", link: "/commands/ls" },
      { text: "ports", link: "/commands/ports" },
      { text: "disk", link: "/commands/disk" },
      { text: "stacks", link: "/commands/stacks" },
      { text: "install", link: "/commands/install" },
      { text: "attach", link: "/commands/attach" },
      { text: "upgrade", link: "/commands/upgrade" },
      { text: "search", link: "/commands/search" },
      { text: "update", link: "/commands/update" },
      { text: "source", link: "/commands/source" },
      { text: "auth", link: "/commands/auth" },
      { text: "backup", link: "/commands/backup" },
      { text: "config", link: "/commands/config" },
      { text: "autoupdate", link: "/commands/autoupdate" },
    ],
  },
]

const cliSidebarRu = [
  {
    text: "CLI (asc-daemon)",
    items: [
      { text: "Обзор", link: "/ru/cli/" },
      { text: "РќР°С‡Р°Р»Рѕ СЂР°Р±РѕС‚С‹", link: "/ru/cli/getting-started" },
      { text: "РџРѕРґРґРµСЂР¶РєР° ASC РІ СЂРµРїРѕР·РёС‚РѕСЂРёРё", link: "/ru/cli/repository-support" },
      { text: "РЎРѕР·РґР°РЅРёРµ СЃРІРѕРµРіРѕ registry", link: "/ru/cli/custom-registry" },
      { text: "API: gRPC + REST", link: "/ru/cli/api" },
      { text: "Токены безопасности", link: "/ru/cli/security-tokens" },
      { text: "Управление приложениями", link: "/ru/cli/app-management" },
      { text: "Пакетный менеджер", link: "/ru/cli/package-manager" },
      { text: "MCP-сервер", link: "/ru/cli/mcp-server" },
      { text: "Мониторинг", link: "/ru/cli/monitoring" },
      { text: "Бекапы", link: "/ru/cli/backups" },
      { text: "SFTP", link: "/ru/cli/sftp" },
      { text: "Консоль", link: "/ru/cli/console" },
      { text: "Планировщик", link: "/ru/cli/scheduler" },
      { text: "Обновления", link: "/ru/cli/updater" },
      { text: "Подключение к платформе", link: "/ru/cli/platform" },
    ],
  },
  {
    text: "Интеграция с AI",
    items: [
      { text: "MCP", link: "/ru/ai-integration/mcp" },
      { text: "Skills", link: "/ru/ai-integration/skills" },
    ],
  },
  {
    text: "Справочник команд",
    items: [
      { text: "Обзор", link: "/ru/commands/" },
      { text: "serve", link: "/ru/commands/serve" },
      { text: "mcp", link: "/ru/commands/mcp" },
      { text: "service", link: "/ru/commands/service" },
      { text: "api", link: "/ru/commands/api" },
      { text: "status", link: "/ru/commands/status" },
      { text: "connect", link: "/ru/commands/connect" },
      { text: "stats", link: "/ru/commands/stats" },
      { text: "app", link: "/ru/commands/app" },
      { text: "ls", link: "/ru/commands/ls" },
      { text: "ports", link: "/ru/commands/ports" },
      { text: "disk", link: "/ru/commands/disk" },
      { text: "stacks", link: "/ru/commands/stacks" },
      { text: "install", link: "/ru/commands/install" },
      { text: "attach", link: "/ru/commands/attach" },
      { text: "upgrade", link: "/ru/commands/upgrade" },
      { text: "search", link: "/ru/commands/search" },
      { text: "update", link: "/ru/commands/update" },
      { text: "source", link: "/ru/commands/source" },
      { text: "auth", link: "/ru/commands/auth" },
      { text: "backup", link: "/ru/commands/backup" },
      { text: "config", link: "/ru/commands/config" },
      { text: "autoupdate", link: "/ru/commands/autoupdate" },
    ],
  },
]

export default defineConfig({
  title: "AdminService.Cloud Docs",
  description: "Documentation for the asc-daemon CLI and the AdminService.Cloud platform",
  base: "/",
  lang: "en-US",
  appearance: true,
  cleanUrls: true,

  head: [["link", { rel: "icon", href: "/screenshots/preview.png" }]],

  vite: {
    resolve: {
      alias: [
        // "@" points at the project root (docs/.vitepress/../..), matching
        // components.json / tsconfig.json so `@/lib/utils` and friends
        // resolve the same way shadcn-vue's CLI would generate them.
        { find: "@", replacement: fileURLToPath(new URL("../..", import.meta.url)) },
      ],
    },
  },

  themeConfig: {
    logo: undefined,
    socialLinks: [{ icon: "github", link: "https://github.com/AdminServiceCloud/asc-daemon" }],
    search: {
      provider: "local",
      options: {
        locales: {
          ru: {
            translations: {
              button: { buttonText: "Поиск", buttonAriaLabel: "Поиск" },
              modal: {
                noResultsText: "Ничего не найдено",
                resetButtonTitle: "Сбросить",
                footer: { selectText: "выбрать", navigateText: "перейти" },
              },
            },
          },
        },
      },
    },
  },

  locales: {
    root: {
      label: "English",
      lang: "en-US",
      themeConfig: {
        nav: [
          { text: "CLI", link: "/cli/" },
          { text: "Platform", link: "/platform/" },
        ],
        sidebar: {
          "/cli/": cliSidebarEn,
          "/ai-integration/": cliSidebarEn,
          "/commands/": cliSidebarEn,
          "/platform/": [{ text: "Platform", items: [{ text: "Overview", link: "/platform/" }] }],
        },
        editLink: {
          pattern: "https://github.com/AdminServiceCloud/asc-documentation/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
        footer: {
          message: "Released under the MIT License.",
          copyright: "Copyright © AdminService.Cloud",
        },
      },
    },
    ru: {
      label: "Русский",
      lang: "ru-RU",
      link: "/ru/",
      themeConfig: {
        nav: [
          { text: "CLI", link: "/ru/cli/" },
          { text: "Платформа", link: "/ru/platform/" },
        ],
        sidebar: {
          "/ru/cli/": cliSidebarRu,
          "/ru/ai-integration/": cliSidebarRu,
          "/ru/commands/": cliSidebarRu,
          "/ru/platform/": [
            { text: "Платформа", items: [{ text: "Обзор", link: "/ru/platform/" }] },
          ],
        },
        editLink: {
          pattern: "https://github.com/AdminServiceCloud/asc-documentation/edit/main/docs/:path",
          text: "Редактировать на GitHub",
        },
        footer: {
          message: "Распространяется по лицензии MIT.",
          copyright: "Copyright © AdminService.Cloud",
        },
        outline: { label: "На этой странице" },
        docFooter: { prev: "Предыдущая", next: "Следующая" },
        lastUpdated: { text: "Обновлено" },
        darkModeSwitchLabel: "Тема",
        returnToTopLabel: "Наверх",
        langMenuLabel: "Сменить язык",
      },
    },
  },
})
