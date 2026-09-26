# 🌐 asc web

The node's web server: nginx installed as a system package or a Docker
container, sites that proxy domains to apps or addresses, Let's Encrypt
certificates issued by the daemon and Cloudflare real IP. See the
[🌐 webserver](/cli/webserver) module page for how configuration is rendered,
checked and applied.

## Usage

```
asc web <action> [args]
```

The web server is managed by root — run these commands with `sudo`. With no
daemon running they work in-process.

### status

```
asc web status
```

Show the engine and its version, the install mode, whether nginx is running,
the number of sites, the last apply and the last error.

### install

```
asc web install [--mode system|docker]
```

Install nginx and apply the configuration.

- **`--mode system`** (default) — the nginx.org package (or the distribution's
  when nginx.org has no build for the release) under systemd. An nginx that is
  already installed is adopted: its `nginx.conf` is saved to
  `nginx.conf.asc-orig`, and the operator's `conf.d`/`sites-enabled` keep
  working.
- **`--mode docker`** — the `asc-webserver` container from
  `nginx:stable-alpine` on the host network. Ports 80 and 443 must be free.

```
sudo asc web install --mode system
```

### uninstall

```
asc web uninstall [--purge]
```

Remove the web server. An adopted nginx gets its original configuration back
and stays installed. **`--purge`** also deletes the generated configuration,
the site list and every certificate.

### test

```
asc web test
```

Render what would be applied now and run `nginx -t` on it, without applying
anything. Exits with 1 and prints nginx's output when the configuration is
rejected.

### reload

```
asc web reload
```

Re-render the configuration, check it with `nginx -t` and reload nginx.

### site list

```
asc web site list
```

List sites: names, target, TLS state and expiry, apply state and owner
(`local` or `platform`).

### site add

```
asc web site add <name>... (--app <id> --port <port> | --to <host:port>) [flags...]
```

Add a site or replace the one with the same id.

- **`--app <id>`** + **`--port <port>`** — proxy to an installed app; the port is
  the container-side port, the daemon finds the published host port.
- **`--to <host:port>`** — proxy to any address instead; repeat it to load balance between several servers.
- **`--balance round-robin|least-conn|ip-hash`** — how requests are spread over several `--to` servers.
- **`--health off|tcp|http`**, **`--health-path <path>`** — active health checks: a failing server leaves rotation until it passes again.
- **`--tls none|letsencrypt`** — HTTPS with a certificate the daemon issues and
  renews (default `none`). The name must point at this node: the daemon checks
  that before ordering.
- **`--cloudflare`** — the domain is proxied by Cloudflare: pass visitors' real
  IPs to the app.
- **`--no-websocket`** — do not forward WebSocket upgrades.
- **`--max-body <size>`** — largest request body, nginx syntax (`64m`, `1g`).
- **`--id <id>`** — site id (default: the first name).

```
sudo asc web site add grafana.example.com --app grafana --port 3000 --tls letsencrypt
sudo asc web site add api.example.com --to 127.0.0.1:8080 --cloudflare
```

### site show

```
asc web site show <id>
```

Print one site with its status, including the last `nginx -t` or Let's Encrypt
error.

### site remove

```
asc web site remove <id>
```

Remove a site.

### site renew

```
asc web site renew <id>
```

Request a Let's Encrypt certificate now, ignoring the retry backoff, and print
the resulting TLS state.

## See also

- [🌐 webserver](/cli/webserver) — the module in depth
- [⏰ schedule](/commands/schedule) · [💾 backup](/commands/backup)
