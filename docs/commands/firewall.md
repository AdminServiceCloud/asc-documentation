# 🛡️ asc firewall

The node's firewall: nftables rules in one table the daemon owns (`inet asc`),
allow and block lists of addresses, and an expert mode that edits the whole
ruleset. Every change is applied with an **automatic rollback** — unless you
confirm it in time, the previous rules come back. See the
[🛡️ firewall](/cli/firewall) module page for how the rules are rendered and
how the rollback works.

## Usage

```
asc firewall <action> [args]
```

The firewall is managed by root — run these commands with `sudo`. They talk to
the running daemon (the rollback timer lives in it); start it first with
`sudo asc service start`.

On a terminal, a change that waits for confirmation asks `Keep the new rules?
[Y/n]` with a countdown. Without a terminal it prints how to confirm and
leaves the timer running.

### status

```
asc firewall status
```

Show the mode, the inbound policy, the settings, a change that is waiting for
confirmation, a competing ufw/firewalld, unapplied changes, and the rules —
the ones derived from the host included — with their packet counters.

### install

```
asc firewall install
```

Install the `nftables` package.

### enable

```
asc firewall enable [--timeout <seconds>] [--no-rollback] [--force] [--no-wait]
```

Turn the managed firewall on: load `table inet asc` from the stored rules with
the inbound policy (default `drop`). The SSH port, the daemon API port and —
when the web server is installed — ports 80 and 443 are opened automatically,
so enabling it does not cut you off.

- **`--timeout <seconds>`** — the confirmation window, 15–600 (default 60).
- **`--no-rollback`** — commit at once, with no window (for scripts).
- **`--force`** — switch off a competing ufw or firewalld; without it the
  command refuses while one is active.
- **`--no-wait`** — do not wait at the confirmation prompt.

```
sudo asc firewall enable
```

### disable

```
asc firewall disable
```

Remove `table inet asc` and the boot unit. A change waiting for confirmation
must be confirmed or rolled back first.

### allow

```
asc firewall allow [<ports>[/tcp|/udp] | icmp] [--from <address>]... [flags...]
```

Add an allow rule. Ports alone mean TCP. With the firewall on, the rule is
applied at once with the confirmation window; with it off it is only stored.

- **`<ports>`** — `443`, `80,443/tcp`, `8000-8100/udp`; `icmp` for ping rules.
- **`--from <address>`** — only for this source: an IP, a CIDR, `@allowlist`
  or `@blocklist`. Repeatable.
- **`--scope host|docker|both`** — traffic to this machine, to ports Docker
  publishes, or both (default `host`).
- **`--comment <text>`**, **`--id <id>`** — a note and a fixed id.
- **`--no-apply`** — store the rule without applying it.
- **`--timeout <seconds>`** — the confirmation window.

```
sudo asc firewall allow 443/tcp
sudo asc firewall allow 5432/tcp --from 10.0.0.0/8 --comment "postgres, private net"
```

### deny

```
asc firewall deny [<ports>[/tcp|/udp] | icmp] [--from <address>]... [--reject] [flags...]
```

Add a rule that drops matching traffic. Deny rules are checked before allow
rules, so their order in the list does not matter. **`--reject`** answers with a
reset or an ICMP error instead of dropping silently. The other flags are those
of `allow`.

```
sudo asc firewall deny --from 203.0.113.7
sudo asc firewall deny 8080/tcp --scope docker --from 203.0.113.0/24
```

### rules

```
asc firewall rules
```

List the rules: id, action, state, protocol, ports, sources, scope, packet
counter and comment. Rules derived from the host are shown as `preset-ssh`,
`preset-api` and `preset-web`.

### remove

```
asc firewall remove <id> [--no-apply] [--timeout <seconds>]
```

Remove a rule.

### set list

```
asc firewall set list [allowlist|blocklist]
```

Show the entries of the allowlist and the blocklist with their expiry.

### set add

```
asc firewall set add <allowlist|blocklist> <address> [--ttl <duration>] [--comment <text>] [--no-apply] [--timeout <seconds>]
```

Add an IP or a CIDR. The blocklist beats every rule and also guards the ports
Docker publishes; the allowlist is let through before the rules. **`--ttl`**
(`90s`, `30m`, `24h`, `7d`) drops the entry after that long.

```
sudo asc firewall set add blocklist 203.0.113.7 --ttl 24h --comment scanner
```

### set remove

```
asc firewall set remove <allowlist|blocklist> <address> [--no-apply] [--timeout <seconds>]
```

Remove an address or network from a set.

### settings

```
asc firewall settings [--policy accept|drop] [--icmp <bool>] [--ipv6 <bool>] [--protect-docker <bool>] [--disable-preset <name>]... [--enable-preset <name>]... [--force]
```

Change the settings and apply them.

- **`--policy`** — what happens to inbound traffic no rule allows.
- **`--icmp`** — answer ping. Error and neighbour-discovery ICMP is always let
  through.
- **`--ipv6`** — filter IPv6 with the same rules; `false` leaves IPv6 alone.
- **`--protect-docker`** — close the ports Docker publishes unless a rule with
  scope `docker` or `both` (or the allowlist) opens them.
- **`--disable-preset ssh|api|web`**, **`--enable-preset`** — switch a derived
  rule off or on. Switching `ssh` or `api` off needs **`--force`**: it can lock
  you out.

### render

```
asc firewall render
```

Print the table the next apply would load.

### apply

```
asc firewall apply [--timeout <seconds>] [--no-rollback] [--force] [--no-wait]
```

Load the stored rules (after `--no-apply` edits). The flags are those of
`enable`.

### confirm

```
asc firewall confirm
```

Confirm the change that is waiting. The new ruleset becomes the one loaded at
boot.

### rollback

```
asc firewall rollback
```

Undo the change that is waiting, now.

### ruleset show

```
asc firewall ruleset show [--raw]
```

Print the whole ruleset as the kernel has it (`nft list ruleset`), or with
**`--raw`** the text you applied in RAW mode.

### ruleset edit

```
asc firewall ruleset edit --i-understand-the-risk [--timeout <seconds>] [--no-wait]
```

Edit the whole ruleset in `$VISUAL`/`$EDITOR` and apply it (RAW mode). This
replaces **every** table, Docker's and fail2ban's included, and can lock you
out — hence the mandatory flag. The result is checked with `nft -c` first and
applied with the same automatic rollback.

### ruleset apply

```
asc firewall ruleset apply <file|-> --i-understand-the-risk [--timeout <seconds>] [--no-wait]
```

Replace the whole ruleset with a file's content (`-` reads stdin). Same
warnings and rollback as `ruleset edit`.

### tables

```
asc firewall tables
```

Print every nftables table of the host, read-only, with its owner (the
daemon, fail2ban, iptables or someone else).
