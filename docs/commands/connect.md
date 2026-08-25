# 🔗 asc connect

Connect this node to an AdminService.Cloud platform using a one-time
registration token issued in the panel.

## Usage

```
sudo asc connect <TOKEN> [--url <URL>]
```

| Argument | Meaning |
|---|---|
| `<TOKEN>` | One-time registration token from the panel. Letters, digits, `-` and `_` only |
| `--url <URL>` | Platform base URL, `https://adminservice.cloud` by default |

Requires root: the token is written to `/etc/asc/platform.token` with `0600`
permissions and the platform URL is recorded in the `[platform]` section of
`/etc/asc/config.toml`.

The same binding happens automatically when the daemon is installed with a
token:

```
curl -fsSL https://raw.githubusercontent.com/AdminServiceCloud/asc-daemon/main/install.sh \
  | sudo bash -s -- --silent --token <TOKEN>
```

`asc connect` is the way to attach a node that was installed earlier without a
platform, and the retry path when registration failed because the platform was
unreachable.

A token works exactly once. Issue a new one in the panel if the node has to be
re-registered.

## See also

- [🔗 Connecting to the platform](/cli/platform)
- [📋 asc status](/commands/status) — shows the platform and node id
