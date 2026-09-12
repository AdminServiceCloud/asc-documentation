# ⬇️ asc install

Install from a registry (`<name>`, `<stack>` or `<stack>/<app>`, with an
optional `@<version>`) or directly from a git repository URL (`https://`,
`ssh://` or `git@host:path`).

## Usage

```
asc install <spec> [--source <name>] [--name <name>] [--branch <branch> | --tag <tag>] [--path <subdir>] [--image | --build]
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
- **`--image`** — pull the prebuilt image when the manifest offers both
  `image` and `image-build`, skipping the interactive choice; conflicts with
  `--build`.
- **`--build`** — build the image locally when the manifest offers both,
  skipping the interactive choice; conflicts with `--image`.

## See also

- [📦 Package manager](/cli/package-manager) — registries, `asc.yaml`, full guide.
- [📱 asc app install](/commands/app#install) — the same install, scoped under `asc app`.
