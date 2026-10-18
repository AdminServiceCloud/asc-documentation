# 🗃️ asc db

The daemon's local database: an SQLite index of installed apps that mirrors
every app's `.asc/` directory (`meta.json`, `settings.json`,
`compose.override.yaml`, …). `asc ls` and the daemon API read the app list
from it instead of scanning `/asc/apps`; the files stay the source of truth.
See [Application management](/cli/app-management) for what it holds and how
it stays in sync.

Root only: the database covers every app on the node. With the daemon
running the commands go through it (`/v1/db`), otherwise they open the file
directly.

## Usage

```
asc db <action>
```

### status

```
asc db status
```

Show the database path, schema version, apps directory, how many apps and
`.asc/` files it holds, its size, when it was last rebuilt and verified, and
whether the file watcher is running.

### verify

```
asc db verify
```

Compare the database with the app files — `stat` only, nothing is read
unless it changed — and fix what differs. Prints how many apps were checked,
added, updated and removed. The daemon does this on its own once a minute.

### rebuild

```
asc db rebuild
```

Rebuild the database from the app files from scratch. Never needed in normal
operation — a missing or broken database is rebuilt automatically at daemon
start — but always safe.
