# 📁 File API (daemon)

## 📌 Description

`FileService` gives a view into and control over the node's filesystem from the root `/`: list a directory, stat a path, create a directory, move/rename, copy, delete, create symbolic and hard links, archive, change permissions/ownership, and stream a file up or down. It is the API behind the platform's file manager (the "Files" tab on a node's page) — a separate, broader feature from the per-application [SFTP server](sftp).

## 🎯 Scenarios

- 🖥️ The file manager in the platform UI: browsing, uploading, downloading, and organizing files anywhere on a node.
- 🔧 A script or CLI user calls the same REST surface directly with a token, like the rest of the daemon API.

## 🏗️ Technical design

- **Scope**: the whole filesystem from `/` — the daemon runs as root, and the platform is responsible for checking the calling user's permission (`files.read`/`files.edit`) before a request reaches the node.
- **Access**: every method requires a root user context. On the CLI unix socket, this is enforced separately from the socket's normal peer-uid rule, since the socket is otherwise world-connectable.
- **Symlinks**: shown (kind, raw target, best-effort target kind), never traversed by a recursive operation (delete, copy, archive).
- **Streaming**: chunked upload (client-stream) and download (server-stream), 256 KiB chunks; an interrupted upload never leaves a truncated file in place of a good one.
- **Links**: `CreateLink` / `POST /v1/files/link` makes a symbolic or hard link; the target is absolute or relative to the link's directory, a symbolic link keeps it verbatim, an existing path is never replaced.
- **Archiving**: `tar.gz` only, using the daemon's existing `tar`/`flate2` dependencies.
- **Limits**: directory listing capped at 10,000 entries per call.
