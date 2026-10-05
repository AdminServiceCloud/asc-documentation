# 🚫 asc fail2ban

The node's fail2ban: install it, switch jails on and off, tune them, and list,
add and release bans. Bans are enforced through nftables in fail2ban's own
table. See the [🚫 fail2ban](/cli/fail2ban) module page for the configuration
the daemon writes.

## Usage

```
asc fail2ban <action> [args]
```

fail2ban is managed by root — run these commands with `sudo`. They talk to the
running daemon; start it first with `sudo asc service start`.

### status

```
asc fail2ban status
```

Show the version, whether fail2ban is running, the defaults (ban time, find
window, retries, ignored addresses), the last error, and the jails with their
counters.

### install

```
asc fail2ban install
```

Install the package, write the daemon's configuration
(`/etc/fail2ban/jail.d/asc.local`) and start the service with the `sshd` jail.

### uninstall

```
asc fail2ban uninstall [--purge]
```

Remove fail2ban and the daemon's configuration file. **`--purge`** also deletes
the daemon's state.

### settings

```
asc fail2ban settings [--bantime <time>] [--findtime <time>] [--maxretry <n>] [--increment <bool>] [--add-ignore <address>]... [--remove-ignore <address>]...
```

Change the defaults for every jail. Times use fail2ban's syntax: `90`, `10m`,
`1h`, `1d`, `1w`; `--bantime -1` bans for good.

- **`--bantime`** — how long a ban lasts (default `1h`).
- **`--findtime`** — the window in which failures are counted (default `10m`).
- **`--maxretry`** — failures inside the window that cause a ban (default 5).
- **`--increment`** — ban repeat offenders for longer each time.
- **`--add-ignore`**, **`--remove-ignore`** — IPs and CIDRs that are never
  banned. Loopback is always ignored.

A configuration fail2ban refuses is not kept: the previous file stays and the
error is printed.

```
sudo asc fail2ban settings --bantime 1d --add-ignore 203.0.113.0/24
```

### jails

```
asc fail2ban jails
```

List the jails the daemon can run: whether each is switched on and running,
its current failures and bans, and its retry override. Jails that read the web
server's logs say so while the web server is not installed.

### enable

```
asc fail2ban enable <jail>
```

Switch a jail on. Known jails: `sshd`, `recidive`, `nginx-http-auth`,
`nginx-botsearch`, `nginx-limit-req`; the three nginx ones need the web server
module.

### disable

```
asc fail2ban disable <jail>
```

Switch a jail off.

### tune

```
asc fail2ban tune <jail> [--maxretry <n>] [--bantime <time>] [--findtime <time>] [--port <ports>] [--logpath <path>]
```

Override one jail's settings. **`--port`** takes ports, ranges or service names
(`22`, `22,2222`, `http,https`); **`--logpath`** an absolute path, globs
allowed.

```
sudo asc fail2ban tune sshd --maxretry 3 --bantime 1d
```

### bans

```
asc fail2ban bans [--jail <jail>]
```

List banned addresses: the address, the jail, when it was banned and until
when (`-` for a permanent ban).

### ban

```
asc fail2ban ban <ip> [--jail <jail>]
```

Ban one IP address by hand (default jail `sshd`). The ban is enforced about a
second later.

### unban

```
asc fail2ban unban <ip> [--jail <jail>]
```

Release an address — from every jail unless **`--jail`** is given. Says so when
the address was not banned.
