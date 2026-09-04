# 🗂️ Create a custom registry

An ASC registry is static JSON: `registry.json` links to category indexes, and each category lists packages.

```text
my-registry/
├── registry.json
└── categories/web.json
```

```json
// registry.json
{
  "name": "acme-registry",
  "format_version": 1,
  "categories": [{ "name": "web", "index": "categories/web.json" }]
}
```

```json
// categories/web.json
{
  "category": "web",
  "packages": [{
    "name": "example-web",
    "type": "app",
    "description": "Example web application",
    "source": { "git": "https://github.com/acme/example-web" }
  }]
}
```

## GitHub repository

Commit the files to a public repository, then add its raw directory URL:

```bash
asc source add https://raw.githubusercontent.com/acme/my-registry/main --name acme
asc update
asc search example-web
asc install example-web --source acme
```

## Your own site

Serve the JSON directory over HTTPS. For Nginx:

```nginx
server {
  listen 443 ssl;
  server_name packages.example.com;
  root /var/www/asc-registry;
  location / { try_files $uri =404; }
}
```

```bash
sudo asc source add https://packages.example.com --name acme
asc update
asc search example-web
```

Use the [registry schemas](https://github.com/AdminServiceCloud/registry/tree/main/schema) to validate JSON. `sudo asc source add` makes the source available to all server users; without sudo it is per-user.

## Platform-managed sources

`SourceService` is the API equivalent of `sudo asc source add/remove` — how the AdminService.Cloud platform pushes an organization's registries onto a connected node without SSH access. `ListSources` returns the system-scope list only; `ReplaceSources` is an idempotent full replace of it (deletions included), so once a node is platform-managed, a source added by hand with `sudo asc source add` is removed by the next push unless it's also in the platform's own list. Advertised via `GetStatus`'s `capabilities` as `"sources"`.
