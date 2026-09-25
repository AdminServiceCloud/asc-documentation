# ⏰ asc schedule

Scheduled jobs run by the daemon: node reboots, app start/stop/restart/update,
backups, shell commands and HTTP checks. See the
[⏰ scheduler](/cli/scheduler) module page for how they are evaluated and stored.

## Usage

```
asc schedule <action> [args]
```

Jobs live in the daemon's data directory (root-owned on a system install) —
run these commands with `sudo`. Times are the node's local time unless `--utc`
is given.

### list

```
asc schedule list
```

List jobs with their trigger, action, next run, last run and result. Jobs the
platform manages are marked `(platform)`.

### add

```
asc schedule add <trigger> <action> [flags...]
```

Add a job. `trigger` is `hourly`, `daily@HH:MM`, `HH:MM` or a five-field cron
expression `min hour day month weekday`. `action` is one of `node-reboot`,
`app-start`, `app-stop`, `app-restart`, `app-update`, `backup`, `shell`, `http`.

- **`--app <app>`** — app the action targets (required for `app-*` and
  `backup`; optional for `shell`, which then runs in the app directory as the
  app's owner).
- **`--command <line>`** — shell command line (`shell`).
- **`--url <url>`**, **`--method <m>`** (default `GET`), **`--header 'Name: value'`**
  (repeatable), **`--body <text>`** — the request (`http`).
- **`--storage <name>`** (repeatable), **`--keep <n>`** — backup storages and
  rotation (`backup`; default: the app's backup policy, else `local`).
- **`--timeout <secs>`** — shell/http timeout, default 600, at most 3600.
- **`--utc`** — evaluate the trigger in UTC.
- **`--comment <text>`**, **`--id <id>`** — a note, and an explicit job id
  (default: generated).

```
sudo asc schedule add daily@03:00 backup --app db --storage s3-main --keep 7
sudo asc schedule add "*/5 * * * *" http --url http://127.0.0.1:8080/health
```

### remove

```
asc schedule remove <schedule>
```

Remove a job and its run history.

### enable

```
asc schedule enable <schedule>
```

Enable a disabled job.

### disable

```
asc schedule disable <schedule>
```

Disable a job without removing it.

### run

```
asc schedule run <schedule>
```

Run a job now, in the foreground, and print what it produced (command output,
HTTP status and body). The run is recorded in the job's history.

### runs

```
asc schedule runs <schedule> [--limit <n>]
```

Show a job's recent runs, newest first (at most 50 are kept).
