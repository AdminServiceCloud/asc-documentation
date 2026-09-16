# 👤 Local user management (daemon)

## 📌 Description

`UserService` gives control over the node's local Linux accounts: list every account (including root), create and delete accounts, lock/unlock, change the login shell, manage supplementary groups (`sudo`, `docker`, ...), and deploy an SSH public key into an account's `~/.ssh/authorized_keys`. It is the API behind the platform's "Users" tab on a node's detail page — a separate, whole-machine feature with no per-application scoping, unlike the [file manager](files)'s optional `app_id`.

This feature is **SSH-key-only by design**: the daemon never handles a Linux password. A freshly created account starts with no usable password (`useradd`'s own default) — login only becomes possible once a key is deployed.

## 🎯 Scenarios

- 🖥️ The "Users" tab in the platform UI lists a node's accounts, and lets an operator create, lock, or delete one.
- 🔑 An organization pushes a team member's public key onto a shared account; pushing the same key again is a no-op, not a duplicate line.
- 🔧 A script or CLI user calls the same REST surface directly with a token, like the rest of the daemon API.

## 🏗️ Technical design

- **Scope**: every account on the machine, root included — no `app_id`-style narrowing, since this is whole-machine administration.
- **Access**: every method requires a root context, the same rule `FileService` enforces.
- **Listing**: `/etc/passwd`, `/etc/shadow` and `/etc/group` are parsed directly and independently of the file manager's own parse; `locked` comes from a `!`-prefixed shadow hash, `groups` lists supplementary memberships only.
- **Create/delete**: `useradd`/`userdel` do the actual work (correct `/etc/shadow`, skeleton files, NSS); deleting hard-refuses uid 0 and any uid below 1000, with no override.
- **Lock/unlock**: `usermod -L`/`-U` — with `UsePAM yes`, this genuinely blocks a locked account's pubkey login on most distros, not just a cosmetic flag.
- **Shell**: must be an absolute path already listed in `/etc/shells`.
- **Groups**: `SetUserGroups` always replaces the full supplementary set, never a partial add/remove.
- **Authorized keys**: idempotent add (a duplicate fingerprint returns the existing entry), fingerprint-based remove, and options-string lines (`command="...",...`) are left untouched rather than parsed.

## 🔗 Related tasks

DMN-099 in [ROADMAP.md](https://github.com/AdminServiceCloud/asc-platform/blob/main/ROADMAP.md) adds `UserService`; the `users` capability flag gates the platform's "Users" tab client-side.
