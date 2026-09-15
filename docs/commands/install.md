# ⬇️ asc install

Install from a registry (`<name>`, `<stack>` or `<stack>/<app>`, with an
optional `@<version>`) or directly from a git repository URL (`https://`,
`ssh://` or `git@host:path`).

## Usage

```
asc install <spec> [--source <name>] [--name <name>] [--branch <branch> | --tag <tag>] [--path <subdir>] [--app <stack app>] [--force] [--image | --build]
```

## Options

- **`spec`** — package spec or repository URL (positional, required).
- **`--source <name>`** — registry source to install from, when several
  provide the package (not used for a direct repository install).
- **`--name <name>`** — custom app name, skips the interactive prompt;
  commands accept it interchangeably with the app id.
- **`--branch <branch>`** — branch to check out (direct repository installs
  only); conflicts with `--tag`.
- **`--tag <tag>`** — tag to check out (direct repository installs only);
  conflicts with `--branch`.
- **`--path <subdir>`** — in-repository subdirectory of the manifest, for a
  monorepo package (direct repository installs only).
- **`--app <stack app>`** — install one app of a stack instead of every
  non-optional one (direct repository installs only; a registry stack app
  is addressed as `<stack>/<app>` in the spec itself).
- **`--force`** — install even though the host cannot currently cover the
  package's declared requirements or runtime quota; skips the interactive
  prompt.
- **`--image`** — pull the prebuilt image when the manifest offers both
  `image` and `image-build`, skipping the interactive choice; conflicts with
  `--build`.
- **`--build`** — build the image locally when the manifest offers both,
  skipping the interactive choice; conflicts with `--image`.

## See also

- [📦 Package manager](/cli/package-manager) — registries, `asc.yaml`, full guide.
- [📱 asc app install](/commands/app#install) — the same install, scoped under `asc app`.
