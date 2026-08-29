# 🔐 asc api

Inspect the daemon's API surface and manage its bearer tokens.

Two kinds of token guard the API. The **primary** is the long-lived one in
`/etc/asc/api.token` — the credential the platform stores when the node is
added, and from then on effectively a refresh token. An **access** token is
short-lived (10 minutes by default), lives only in the daemon's memory and is
minted from the primary; it can drive the whole daemon but cannot read,
rotate, mint or revoke tokens.

Every subcommand talks to the daemon over its unix socket, so the daemon has
to be running. The daemon itself decides who may manage tokens: on the socket
that means root, which is why these commands are run under `sudo`.

## Usage

```
asc api <action>
```

### status

Show the listener address, the socket path, the TLS mode and certificate
fingerprint, how many access tokens are alive, and whether a rotation is
waiting to be confirmed. The primary token appears only as a truncated
SHA-256 digest — enough to compare against what the platform holds, never
enough to authenticate.

### token show

Print the primary token. Root only, and only over the socket.

This is the recovery path when a rotation went through on the daemon but the
platform never stored the new value: read the token here and re-connect the
node from the panel.

### token issue

Mint an access token and print it once.

```
sudo asc api token issue --ttl 300 --label "on-call debug"
```

`--ttl` is in seconds; the daemon clamps it to at most 3600 and defaults to
600. `--label` is a free-form note kept in the daemon's memory.

::: warning
An access token is full machine control minus token management — it can
install and start an application, which means cloning and running an
arbitrary git repository as root. Treat handing one out as handing out a root
shell with a short fuse.
:::

### token revoke

Kill every live access token at once. The primary is untouched, so the
platform simply mints itself a new one on its next call. This is the button
to reach for when a temporary token leaks — it is safe, and it does not risk
the lockout that a rotation can.

### token rotate

Replace the primary token and print the new one. Every access token is
revoked as part of it.

```
sudo asc api token rotate --grace 300
```

`--grace` is how long the token being replaced keeps working, giving whoever
holds it time to store the new value; `0` switches over immediately. The
window is kept in memory only, so restarting the daemon inside it ends it
early.

::: danger
If the node is connected to a platform, rotating from the machine leaves the
platform holding a token that is about to stop working — re-connect the node
from the panel before the window closes, or rotate from the panel instead,
where the new token is stored for you.
:::

### tls

Choose how the API listener terminates TLS.

```
sudo asc api tls self_signed
sudo asc api tls files --cert /etc/letsencrypt/live/node.example.com/fullchain.pem \
                       --key  /etc/letsencrypt/live/node.example.com/privkey.pem
```

| Mode | What it means |
|---|---|
| `off` | Plain HTTP. Only safe while the listener stays on loopback. |
| `self_signed` | The daemon issues its own certificate; the platform pins its fingerprint, like an SSH host key. |
| `acme` | The daemon obtains a certificate itself. **Not available yet** — the daemon refuses to start in this mode; use `files` with a certbot-managed certificate instead. |
| `files` | A certificate and key you install on the node. Publicly trusted chains are verified normally; a private CA is pinned by fingerprint. |

`--domain` sets the name the platform and operators reach the node by, so it
keeps working across an IP change. In `self_signed` mode the name is baked into
the certificate, which is reissued on the next start.

The setting is written to config.toml; restart the daemon to apply it.

### listen

Set the address the API listens on.

```
sudo asc api listen 0.0.0.0:8420
```

Leaving loopback without TLS is refused politely with a warning: the bearer
token grants full control of the machine and must never cross the network in
the clear. Restart the daemon to apply.

## See also

- [📡 API](/cli/api) — the API these tokens guard.
- [🔐 Security tokens](/cli/security-tokens) — the full model: kinds, rotation, revocation.
- [🔗 Platform](/cli/platform) — connecting the node and reaching it directly over TLS.
