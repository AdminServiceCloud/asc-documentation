---
layout: home
title: AdminService.Cloud Docs
hero:
  name: AdminService.Cloud
  text: Документация
  tagline: Open source CLI-демон для вашего сервера и платформа, построенная поверх него.
  image:
    src: /screenshots/preview.png
    alt: asc-daemon preview
  actions:
    - theme: brand
      text: Документация CLI
      link: /ru/cli/
    - theme: alt
      text: Платформа (в разработке)
      link: /ru/platform/
    - theme: alt
      text: GitHub
      link: https://github.com/AdminServiceCloud/asc-daemon
---

<div class="mx-auto max-w-5xl px-6 pb-24 pt-4">
  <h2 class="mb-6 text-xl font-semibold text-foreground">Начните с ASC</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ArticleCard icon="🚀" title="Начало работы" details="Установите ASC на сервер и проверьте сервис." link="/ru/cli/getting-started" />
    <ArticleCard icon="📦" title="Поддержка ASC" details="Подготовьте одно приложение или стек." link="/ru/cli/repository-support" />
    <ArticleCard icon="🗂️" title="Свой registry" details="Публикуйте пакеты в GitHub или на HTTPS-сайте." link="/ru/cli/custom-registry" />
  </div>
  <h2 class="mb-6 text-xl font-semibold text-foreground">CLI (asc-daemon)</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ArticleCard icon="📡" title="API: gRPC + REST" details="ConnectRPC, REST-транспорт, токены и аутентификация через unix-сокет." link="/ru/cli/api" />
    <ArticleCard icon="🔐" title="Токены безопасности" details="Основной и временные токены, запретный список, ротация с окном совместимости, отзыв." link="/ru/cli/security-tokens" />
    <ArticleCard icon="📱" title="Управление приложениями" details="Docker и нативные приложения, команды жизненного цикла CLI." link="/ru/cli/app-management" />
    <ArticleCard icon="📦" title="Пакетный менеджер" details="Манифесты asc.yaml, реестры, asc install." link="/ru/cli/package-manager" />
    <ArticleCard icon="🤖" title="MCP-сервер" details="Model Context Protocol сервер для AI-агентов." link="/ru/cli/mcp-server" />
    <ArticleCard icon="📊" title="Мониторинг" details="Мониторинг системы и приложений." link="/ru/cli/monitoring" />
    <ArticleCard icon="💾" title="Бекапы" details="Создание, восстановление и ротация бекапов приложений." link="/ru/cli/backups" />
    <ArticleCard icon="📁" title="SFTP" details="SFTP-сервер по приложению." link="/ru/cli/sftp" />
    <ArticleCard icon="📁" title="Файлы" details="Файловый API ноды: обзор, передача, архивирование." link="/ru/cli/files" />
    <ArticleCard icon="🖥️" title="Консоль" details="WebSocket-консоль приложений и live-логи." link="/ru/cli/console" />
    <ArticleCard icon="⏰" title="Планировщик" details="Планировщик повторяющихся задач." link="/ru/cli/scheduler" />
    <ArticleCard icon="🔄" title="Обновления" details="asc-updater — автообновления, каналы, откат." link="/ru/cli/updater" />
    <ArticleCard icon="🔗" title="Платформа" details="Подключение ноды по токену регистрации или через asc connect." link="/ru/cli/platform" />
  </div>

  <h2 class="mb-6 mt-14 text-xl font-semibold text-foreground">Платформа</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ArticleCard icon="☁️" title="Обзор платформы" details="Документация в разработке." link="/ru/platform/" />
  </div>
</div>
