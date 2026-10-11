# 🤖 The daemon's MCP server

## 📌 Description

`asc mcp serve` is a local [Model Context Protocol](https://modelcontextprotocol.io/)
server for AI clients. It uses standard input/output and forwards management
operations to the running ASC daemon through its local Unix socket.

The daemon derives access from the kernel's `SO_PEERCRED` peer UID. A normal
user can only see and manage that user's applications; a root MCP process can
manage every application. No MCP argument can select another UID or role.

## 🎯 Scenarios

- Connect Codex, Claude Code, or another stdio MCP client and manage apps you own.
- Run the same command as root when an administrator intentionally needs all apps.
- Read state and logs; install, upgrade, configure, back up, restore, or remove apps.

## 🏗️ Technical design

### Tools

| Tool | Action | MCP hint |
|---|---|---|
| `system_info`, `metrics_get` | daemon and application metrics | read-only |
| `app_list`, `app_info`, `logs_read`, `app_settings_get` | application data | read-only |
| `app_install`, `app_upgrade`, `app_rebuild`, `app_control`, `app_settings_update` | application management | mutating |
| `backup_list`, `backup_create`, `backup_restore`, `backup_prune` | local backups | restore is destructive |
| `app_remove`, `exec_command` | removal and host commands | destructive |

`app_upgrade` upgrades a stopped app — or a docker compose app in place, while
it runs. `app_rebuild` (`app`, optional `service`, `pull_source` — default
`true`, forced `false` with a `service`) pulls or builds the app's images afresh
and recreates its containers without changing its version; see
[📱 app-management](/cli/app-management).

The daemon resolves and authorizes every app reference. A foreign and an
unknown app return the same `not found` error. Destructive tools carry MCP
annotations so the client can request confirmation.

`exec_command` runs in the MCP process, not in the root daemon, so it inherits
the actual OS UID of `asc mcp serve`. It uses `/bin/sh -lc`, defaults to 60
seconds (maximum 300), and limits stdout and stderr to 1 MiB each.

### Connect an MCP client

Requirements: `asc` is on PATH, the daemon is running (`asc status`), and the
client user can connect to the configured ASC Unix socket.

For a Codex-compatible stdio configuration:

```json
{
  "mcp_servers": {
    "asc": { "command": "asc", "args": ["mcp", "serve"] }
  }
}
```

This normal configuration can manage only the current user's apps. To
intentionally manage all apps, run the MCP client command through `sudo` with
arguments `asc mcp serve`; configure non-interactive sudo according to the
host security policy.

For Claude Code:

```bash
claude mcp add asc -- asc mcp serve
```

If connection fails, check `asc status`, the daemon service, and the configured
socket path. Use an absolute `asc` path if it is not on PATH. Do not grant root
only to make an app visible: confirm the app was installed under the intended UID.
