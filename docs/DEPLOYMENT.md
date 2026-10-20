# Deployment

## API
1. Provision MongoDB (Atlas or self-hosted).
2. Set `MONGO_URI`, `JWT_SECRET`, `PORT`, `NODE_ENV=production`.
3. `npm ci && npm start` behind a reverse proxy (nginx) with HTTPS.

## Customer portal and admin panel
1. Set `VITE_API_URL` to the public API URL.
2. `npm run build` and serve `dist/` from any static host (Nginx, S3 + CloudFront, Netlify).

## Mobile
1. Update `API_URL` in `mobile/src/api/client.js`.
2. `npx eas build -p android` / `npx eas build -p ios`.
