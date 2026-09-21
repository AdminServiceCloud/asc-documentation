# 🔌 asc ports

Show published ports per app — shorthand for
[`asc app ports`](/commands/app#ports) (root sees all users' apps).

## Usage

```
asc ports [-l | --listening]
```

## Options

- **`-l`, `--listening`** — real listening ports on the host (DMN-103),
  not what apps declare: parses `/proc/net/*` directly and merges in
  Docker container attribution and this daemon's own API port.

## Without `--listening`

Each app and the host==container ports it publishes, as a table.

## With `--listening`

Every socket actually bound on the host, one per line — port, protocol,
address, and (when resolvable) the owning ASC app, Docker container or
process. A port an installed app declares but has not bound yet (the app
is stopped) is shown reserved instead of looking free.

## See also

- [📱 Application management](/cli/app-management)
- [📊 Monitoring](/cli/monitoring)
