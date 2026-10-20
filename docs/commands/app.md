# 📱 asc app

Manage apps: your own; run under `sudo` to manage everyone's.

## Usage

```
asc app <action> [args]
```

### list

List apps. Root sees all users' apps, grouped by owner.

### info

```
asc app info <id>
```

Show one app's details.

### disk

```
asc app disk [id]
```

Show disk usage: a quota bar (if a quota is set) and a breakdown by image,
repository, data and custom volumes. Without an id: total space occupied by
all apps, then each app's usage, largest first. Shorthand for the whole-fleet
view: [`asc disk`](/commands/disk).

### ports

```
asc app ports [id]
```

Show published ports (host==container) with their transport. Without an id:
every app and its ports as a table. Shorthand for the whole-fleet view:
[`asc ports`](/commands/ports).

### clone

```
asc app clone <id> [--name <name>]
```

Clone an app instance (data, env, settings) into a new one.

- **`--name <name>`** — custom name for the clone (skips the interactive prompt).

### install

```
asc app install <spec> [--source <name>] [--name <name>] [--branch <branch> | --tag <tag>] [--path <subdir>] [--app <stack app>] [--force] [--image | --build]
```

Install an app from a registry or a git repository URL — same as top-level
[`asc install`](/commands/install), see its page for all flags.

### attach

```
asc app attach <id>
```

Attach to the app's console — same as top-level [`asc attach`](/commands/attach).

### upgrade

```
asc app upgrade <spec>
```

Upgrade the app to a new version — same as top-level [`asc upgrade`](/commands/upgrade).

### rebuild

```
asc app rebuild <app> [--service <service>] [--no-pull]
```

Rebuild the app without changing its version: pull or build its images afresh
and force-recreate its containers — same as top-level
[`asc rebuild`](/commands/rebuild), see its page for details.

- **`--service <service>`** — one service of a docker compose app only
  (implies `--no-pull`).
- **`--no-pull`** — do not fetch the ref the app follows first.

### services

```
asc app services <id>
```

List the services of a docker compose app: state, health, image and
published ports of each service's first container (`missing` — the service
has no container).

### start

```
asc app start <id> [-d|--detach] [--service <service>] [--force]
```

Start the app and attach to its console (Docker apps, interactive terminal).

- **`-d`, `--detach`** — start in the background without attaching.
- **`--service <service>`** — start one service of a docker compose app.
- **`--force`** — start even though required first-time setup questions are
  still unanswered; the decision is remembered until they all get an answer.

### stop

```
asc app stop <id> [--service <service>]
```

- **`--service <service>`** — stop one service of a docker compose app; the
  next start, rebuild or upgrade of the app brings it back.

### kill

```
asc app kill <id> [--service <service>]
```

Force-stop: SIGKILL, no graceful shutdown (for an app stuck stopping).

- **`--service <service>`** — kill one service of a docker compose app.

### restart

```
asc app restart <id> [--service <service>] [--force]
```

- **`--service <service>`** — restart one service of a docker compose app.
- **`--force`** — restart even though required first-time setup questions are
  still unanswered, like `start --force`.

### logs

```
asc app logs <id> [-n|--tail <n>] [-t|--timestamps] [--service <service>]
```

Show app logs.

- **`-n`, `--tail <n>`** — number of trailing lines. Default: `100`.
- **`-t`, `--timestamps`** — prefix each line with its timestamp.
- **`--service <service>`** — one service of a docker compose app, without
  the service-name prefix.

### settings

```
asc app settings <id>
```

Interactively edit app settings defined in `asc.settings.yaml`.

### remove

```
asc app remove <id> [-y|--yes]
```

Remove an app and all its data.

- **`-y`, `--yes`** — confirm removal without prompting.

## See also

- [📱 Application management](/cli/app-management) — full guide.
