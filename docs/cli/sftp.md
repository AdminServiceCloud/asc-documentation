# 📁 SFTP server (daemon)

## 📌 Description

A built-in SFTP server with per-application isolation: a user gets access to the files of a **specific application**, not the whole server — their own SFTP client (FileZilla, WinSCP, `sftp`), not a browser tab. This is a different feature from the platform UI's [file manager](files), which browses a whole node's filesystem through the daemon's `FileService`.

## 🎯 Scenarios

- 🔧 A developer connects FileZilla to `sftp://node:2022` with credentials issued by the platform and sees only their application's directory.
- 🎮 A game designer uploads mods to a game server without OS access.

## 🏗️ Technical design

- **Server**: a built-in SSH/SFTP subsystem in Rust (russh), a separate port (2022 by default), no OS system users.
- **Isolation**: a virtual chroot onto the application directory (volumes for Docker, the working directory for native apps); path traversal is ruled out at the path-resolver level.
- **Accounts**: temporary credentials/keys are issued by the platform with a `user → application → permissions (ro/rw)` binding; TTL and revocation.
- **Permissions**: granting SFTP access is the `apps.files` permission ([🔐 access-control](https://github.com/AdminServiceCloud/asc-platform/blob/main/docs/features/access-control.md)).
- **Quotas and limits**: upload size and speed limits — per plan/config.
- **Audit**: a log of sessions and write operations.

## 🔗 Related tasks

DMN-010 in [ROADMAP.md](https://github.com/AdminServiceCloud/asc-platform/blob/main/ROADMAP.md).
