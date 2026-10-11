# ⏫ asc upgrade

Upgrade an app to a new version: `<name>` (latest) or `<name>@<version>`.

## Usage

```
asc upgrade <spec>
```

- **`spec`** — app name, optionally with `@<version>` (positional, required).

Without a version the app moves to its repository's newest tag, or to the head
of the branch it follows. A docker, systemd or process app must be stopped
first. A **docker compose app** is upgraded in place while it runs: the new
commit is fetched and checked out inside its repository (its data in relative
bind mounts stays where it is), images are pulled and built while the old
containers keep running, and only then are the containers recreated. Local
edits to tracked files are saved to `.asc/backups/` before being overwritten.
A failure restores the previous commit, image tags and containers; the
per-service settings in `.asc/compose.override.yaml` survive the upgrade.

To rebuild without moving to another version, use
[`asc rebuild`](/commands/rebuild).

## See also

- [📦 Package manager](/cli/package-manager)
