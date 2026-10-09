# Feedback Server

Receives feedback from the navbar button of the knowledge base and stores it in SQLite. No dependencies; Node.js >= 22.13 (built-in `node:sqlite`).

## Local Test

```bash
cd feedback-server
node server.mjs
```

In a second terminal, `npm start` in the repository root is enough. In development the site posts to `http://localhost:8787/feedback`. Submitted entries are shown with:

```bash
cd feedback-server
node list.mjs
```

## Configuration

All settings are environment variables.

- **`PORT`:** Listening port, default `8787`.
- **`HOST`:** Listening address, default `127.0.0.1`.
- **`DB_PATH`:** SQLite file, default `./data/feedback.db`.
- **`ALLOWED_ORIGINS`:** Comma-separated origins allowed by CORS, default `http://localhost:3000,https://knowledge.moritz-grimm.dev`.
- **`TRUST_PROXY`:** `1` reads the client IP from `X-Forwarded-For`. Only valid behind a reverse proxy, otherwise clients can fake their IP. Default unset.

## Rules

- Accepted: `rating` (`up` or `down`), optional `comment` (up to 500 characters), optional `contact` (up to 200 characters), `path`, `locale` (`en` or `de`).
- At most 5 entries per client IP within 10 minutes, kept in memory.
- Requests from other origins are rejected with 403.
- A filled honeypot field `website` is answered with success and not stored.
- IP addresses are not stored.

## Placeholders

The deployment files contain placeholders in angle brackets. Each one has to be replaced with a value of the target server.

- **`<INSTALL_DIR>`:** Directory that holds `server.mjs` and `list.mjs`, for example `/opt/knowledge-base-feedback`. Used in `knowledge-base-feedback.service`.
- **`<NODE_PATH>`:** Absolute path of a Node.js binary >= 22.13, from `which node`. Used in `knowledge-base-feedback.service`.
- **`<PORT>`:** Free local port, for example `8787`. Must be identical in the service file and the proxy configuration.
- **`<SITE_ORIGIN>`:** Origin of the deployed knowledge base, scheme and host only, without path, locale or trailing slash. For the current site `https://knowledge.moritz-grimm.dev`; the German version `/de/` is served from the same origin. Used in `knowledge-base-feedback.service`.
- **`<API_DOMAIN>`:** Domain under which the endpoint is reachable, for example `api.moritz-grimm.dev`. Used in `Caddyfile.example` and `nginx.conf.example`. The site posts to `https://<API_DOMAIN>/feedback`; a different domain requires `FEEDBACK_ENDPOINT` at build time or a change of the default in `docusaurus.config.ts`.

Further assumptions that may differ on the server:

- systemd is the service manager. Without it, `node server.mjs` with the environment variables of the service file is enough.
- The reverse proxy is Caddy (`Caddyfile.example`) or nginx (`nginx.conf.example`).
- The dynamic user of the service file needs no manual account. The database lands in `/var/lib/knowledge-base-feedback/feedback.db`.

## Deployment

1. Copy `server.mjs`, `list.mjs` and `package.json` to `<INSTALL_DIR>`.
2. Fill in the placeholders of `knowledge-base-feedback.service` and install it to `/etc/systemd/system/`.
3. Run `systemctl daemon-reload`, then `systemctl enable --now knowledge-base-feedback`.
4. Add the filled-in route of `Caddyfile.example` or `nginx.conf.example` to the proxy configuration and reload the proxy.
5. Check `https://<API_DOMAIN>/health`; the answer is `{"status":"ok"}`.
6. Build and deploy the site afterwards, so that the button never points to a missing endpoint.

Stored entries are shown with the following command. Logs are available through `journalctl -u knowledge-base-feedback`.

```bash
sudo systemd-run --pipe --wait -p DynamicUser=yes -p StateDirectory=knowledge-base-feedback \
  -p WorkingDirectory=<INSTALL_DIR> -E DB_PATH=/var/lib/knowledge-base-feedback/feedback.db <NODE_PATH> list.mjs
```

Copying `feedback.db` is sufficient as a backup.
