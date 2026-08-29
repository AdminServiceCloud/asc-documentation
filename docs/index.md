---
layout: home
title: AdminService.Cloud Docs
hero:
  name: AdminService.Cloud
  text: Documentation
  tagline: Open source CLI daemon for your server, plus the platform built on top of it.
  image:
    src: /screenshots/preview.png
    alt: asc-daemon preview
  actions:
    - theme: brand
      text: CLI Documentation
      link: /cli/
    - theme: alt
      text: Platform (in development)
      link: /platform/
    - theme: alt
      text: GitHub
      link: https://github.com/AdminServiceCloud/asc-daemon
---

<div class="mx-auto max-w-5xl px-6 pb-24 pt-4">
  <h2 class="mb-6 text-xl font-semibold text-foreground">Start with ASC</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ArticleCard icon="🚀" title="Getting Started" details="Install ASC on a server and verify the service." link="/cli/getting-started" />
    <ArticleCard icon="📦" title="Add ASC support" details="Package one app or a multi-app stack." link="/cli/repository-support" />
    <ArticleCard icon="🗂️" title="Custom registry" details="Publish packages from GitHub or your HTTPS site." link="/cli/custom-registry" />
  </div>
  <h2 class="mb-6 text-xl font-semibold text-foreground">CLI (asc-daemon)</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ArticleCard icon="📡" title="API: gRPC + REST" details="ConnectRPC, REST transport, tokens and the unix-socket auth model." link="/cli/api" />
    <ArticleCard icon="🔐" title="Security tokens" details="Primary and access tokens, the denied set, rotation with a grace window, revocation." link="/cli/security-tokens" />
    <ArticleCard icon="📱" title="Application management" details="Docker and native apps, lifecycle commands via the CLI." link="/cli/app-management" />
    <ArticleCard icon="📦" title="Package manager" details="asc.yaml manifests, registries, asc install." link="/cli/package-manager" />
    <ArticleCard icon="🤖" title="MCP server" details="Model Context Protocol server for AI agents." link="/cli/mcp-server" />
    <ArticleCard icon="📊" title="Monitoring" details="System and application monitoring." link="/cli/monitoring" />
    <ArticleCard icon="💾" title="Backups" details="Application backup, restore and rotation." link="/cli/backups" />
    <ArticleCard icon="📁" title="SFTP" details="Per-application SFTP server." link="/cli/sftp" />
    <ArticleCard icon="🖥️" title="Console" details="WebSocket application console and live logs." link="/cli/console" />
    <ArticleCard icon="⏰" title="Scheduler" details="Task scheduler for recurring jobs." link="/cli/scheduler" />
    <ArticleCard icon="🔄" title="Updater" details="asc-updater — auto-updates, channels, rollback." link="/cli/updater" />
    <ArticleCard icon="🔗" title="Platform" details="Connect a node with a registration token or asc connect." link="/cli/platform" />
  </div>

  <h2 class="mb-6 mt-14 text-xl font-semibold text-foreground">Platform</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ArticleCard icon="☁️" title="Platform overview" details="Documentation is in development." link="/platform/" />
  </div>
</div>
