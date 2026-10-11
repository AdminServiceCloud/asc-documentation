# 🧱 asc rebuild

Rebuild an app without changing its version: pull or build its images afresh
and force-recreate its containers. Same as [`asc app rebuild`](/commands/app#rebuild).

## Usage

```
asc rebuild <app> [--service <service>] [--no-pull]
```

- **`app`** — app id or name (positional, required).
- **`--service <service>`** — rebuild one service of a docker compose app
  only; the other services are left untouched. Implies `--no-pull`.
- **`--no-pull`** — do not fetch the source first. By default the ref the app
  already follows is fetched (its branch head; a tag-pinned app keeps its
  commit, since a tag does not move).

Docker and docker compose apps only — a systemd or process app has nothing to
rebuild. Images are pulled (under whatever tag they have) or rebuilt on a
fresh base image while the old containers keep running, and only then are the
containers recreated. The app keeps its state: a stopped app stays stopped,
with its containers recreated. A failed compose rebuild restores the previous
commit, image tags and containers.

```
$ asc rebuild shop
App 'shop' rebuilt: db, web
  commit: 3f2a9c1 → 8d41e07
```

## See also

- [📱 Application management](/cli/app-management) — rebuild in detail.
- [⏫ asc upgrade](/commands/upgrade) — move an app to another version.
