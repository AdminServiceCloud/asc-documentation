# 🔐 asc wireguard

The node's WireGuard: create tunnels, add peers with generated keys and a ready
client config, choose what each peer may reach (AllowedIPs), switch tunnels on
and off, read their configuration and import a `.conf` you already have. See
the [🔐 WireGuard](/cli/wireguard) module page for how the files are written.

## Usage

```
asc wireguard <action> [args]
```

WireGuard is managed by root — run these commands with `sudo`. They talk to the
running daemon; start it first with `sudo asc service start`.

### status

```
asc wireguard status
```

Show the version, the node's own address, and every tunnel: up or down, started
at boot or not, port, addresses, NAT, the commands it runs as root, and its
peers with the last handshake and the traffic each moved. Files in
`/etc/wireguard` that ASC does not manage are listed below.

### install

```
asc wireguard install
```

Install `wireguard-tools` (apt or dnf). The output is streamed.

### uninstall

```
asc wireguard uninstall [--purge]
```

Stop the tunnels the daemon manages and remove the package. **`--purge`** also
deletes their configuration files, which hold the private keys.

### add

```
asc wireguard add <name> --address <cidr>... [--port <port>] [--dns <address>]... [--mtu <n>] [--endpoint <host>] [--nat]
```

Create a tunnel with a fresh key and bring it up now and at boot.

- **`--address`** — the tunnel's address and network, for example `10.8.0.1/24`.
  Repeatable (one IPv4 and one IPv6 network, say).
- **`--port`** — the UDP port to listen on (default 51820); `0` makes a
  client-style tunnel that does not listen.
- **`--dns`** — the DNS server clients are told to use. It is a note in the
  client configs, not a `DNS =` line on the server.
- **`--endpoint`** — the public host name or address clients connect to.
- **`--nat`** — masquerade the VPN network to the internet (IPv4).

```
sudo asc wireguard add wg0 --address 10.8.0.1/24 --endpoint vpn.example.com --nat
```

### set

```
asc wireguard set <name> [--address <cidr>]... [--port <port>] [--dns <address>]... [--mtu <n>] [--endpoint <host>] [--nat <bool>]
```

Change a tunnel the daemon manages. Peers and the port apply to a running
tunnel without dropping it; addresses, MTU and NAT rebuild the interface (a
brief gap). A change WireGuard refuses is rolled back.

### remove

```
asc wireguard remove <name>
```

Take the tunnel down and delete its file.

### up

```
asc wireguard up <name>
```

Bring a tunnel up and enable it at boot. Works on files ASC does not manage too.

### down

```
asc wireguard down <name>
```

Take a tunnel down and disable it at boot.

### show

```
asc wireguard show <name>
```

Print the tunnel's configuration file with the private and pre-shared keys
replaced by `(hidden)`. Works on files ASC does not manage too.

### import

```
asc wireguard import <file|-> [--name <name>] [--overwrite] [--accept-hooks] [--start]
```

Take a ready `.conf` — a server's (with `ListenPort` and peers) or a client's
(one peer with an `Endpoint`) — validate it, rewrite it with ASC's marker and
keep its keys. The name defaults to the file name; use `-` to read standard
input (then `--name` is required).

- **`--overwrite`** — replace a tunnel of that name; the old file is kept as
  `<name>.conf.asc-bak`.
- **`--accept-hooks`** — allow `PreUp`, `PostUp`, `PreDown` and `PostDown`
  commands from the file. They run as root, so the import is refused until you
  say so. `SaveConfig = true` is always dropped.
- **`--start`** — bring the tunnel up and enable it at boot.

Anything dropped or not understood is printed as a warning.

```
sudo asc wireguard import office.conf --start
```

### peer add

```
asc wireguard peer add <interface> <name> [--public-key <key>] [--allowed-ips <cidr>]... [--no-psk] [--keepalive <s>] [--endpoint <host:port>] [--routes <full|subnet|list>] [--client-dns <address>]... [--client-endpoint <host>] [-o <file>]
```

Add a peer: the next free address of the tunnel's network, a generated key pair
and pre-shared key, and the client config. The config holds the peer's private
key and **is shown only now**; the daemon keeps just the public key. With
`--output` it is written to a file readable by its owner only.

- **`--public-key`** — use the key the client made itself; the config then has
  a `<PRIVATE_KEY>` placeholder.
- **`--allowed-ips`** — the peer's addresses and the networks behind it, instead
  of the next free address.
- **`--routes`** — what the client sends through the tunnel (its AllowedIPs):
  `full` (`0.0.0.0/0, ::/0`), `subnet` (only the VPN network, the default) or a
  list such as `10.8.0.0/24,192.168.10.0/24`.
- **`--client-dns`**, **`--client-endpoint`** — replace the tunnel's DNS or
  public host in this config.
- **`--keepalive`** — seconds between keepalives (default 25); `0` is off.
- **`--no-psk`** — skip the pre-shared key.

```
sudo asc wireguard peer add wg0 phone --routes full -o phone.conf
```

### peer set

```
asc wireguard peer set <interface> <peer> [--name <name>] [--allowed-ips <cidr>]... [--endpoint <host:port>] [--keepalive <s>] [--enable | --disable]
```

Change a peer; `<peer>` is its public key or its name. **`--allowed-ips`**
replaces the addresses and networks routed to it — add a network behind the
peer for site-to-site. **`--disable`** keeps the peer in the file but cuts it
off; **`--enable`** loads it again.

```
sudo asc wireguard peer set wg0 phone --allowed-ips 10.8.0.2/32,192.168.50.0/24
```

### peer remove

```
asc wireguard peer remove <interface> <peer>
```

Remove a peer.

### peer config

```
asc wireguard peer config <interface> <peer> [--routes <full|subnet|list>] [--client-dns <address>]... [--client-endpoint <host>] [-o <file>]
```

Print an existing peer's client config. The daemon does not keep the peer's
private key, so the file has a `<PRIVATE_KEY>` placeholder for it. The options
are the same as for `peer add`.
