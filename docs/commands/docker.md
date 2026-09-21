# 🐳 asc docker

Inspect the node's Docker Engine: **every** container on the host, not just
the ones ASC installed.

Root only. A container ASC did not create has no owner for the ownership
check to work against, so there is nothing to scope a non-root caller to.

## Usage

```
asc docker <action>
```

### ps

```
asc docker ps [-a | --all] [-s | --size]
```

List containers on this host, ASC-managed or not. A container that *is* an
ASC application is marked with its app id in brackets.

- **`-a`, `--all`** — include stopped containers.
- **`-s`, `--size`** — ask the Engine for container sizes. Off by default: to
  answer, the Engine walks every container's writable layer, which is a
  visible pause on a busy host.

### stats

```
asc docker stats [<id>...]
```

Live CPU and memory of containers. Without ids — every running container.

Like `docker stats --no-stream`, this takes two readings ~500 ms apart to
compute a CPU percentage. Both readings are taken around one shared sleep, so
asking about fifty containers costs the same ~500 ms as asking about one, and
the id filter is applied *before* that window rather than after. A container
that disappears between the two readings is simply left out.

### images

```
asc docker images
```

List images on this host, ASC-managed or not. A row an installed app still
runs (running or stopped) is marked protected, with the app named.

### volumes

```
asc docker volumes
```

List named Docker volumes. A volume an installed app's settings declare is
marked protected the same way images are.

### networks

```
asc docker networks
```

List networks. Inventory-only — there is no delete action here (see
[Cleanup](#cleanup)).

### df

```
asc docker df
```

Disk usage summary, like `docker system df`: counts and bytes for images,
containers, volumes and build cache. Expensive to answer — the Engine walks
every layer and volume — so call it on demand, not on a timer.

### prune

```
asc docker prune <images|volumes|build-cache> [--dry-run] [--dangling]
```

Remove unused images/volumes/build cache **one item at a time** — never the
Engine's own bulk `/images/prune` or `/volumes/prune` endpoints, and never
anything an installed app still needs, running or stopped.

- **`--dry-run`** — compute the exact same plan without removing anything.
- **`--dangling`** — images only: limit to dangling (untagged) images.

## Cleanup

Networks are never a prune target. ASC does not create or delete networks of
its own, and the Engine's own network prune removes any network with no
*running* container attached — including a stopped Compose stack's network,
which would silently break its next `up`.

## Lifecycle control

There is none here, deliberately. Use [`asc app start|stop`](/commands/app)
for ASC applications: their containers must not be started or stopped behind
the application manager's back, because the desired state is reconciled after
a daemon restart and the container would come straight back.

## See also

- [📱 Application management](/cli/app-management)
- [📊 asc stats](/commands/stats) — the same figures, per ASC application
