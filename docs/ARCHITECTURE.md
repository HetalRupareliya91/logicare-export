# Architecture

```
 ┌───────────────┐   ┌──────────────┐   ┌──────────────┐
 │ Customer web  │   │ Admin panel  │   │ Mobile (Expo)│
 │ React + Vite  │   │ React + Vite │   │ React Native │
 └──────┬────────┘   └──────┬───────┘   └──────┬───────┘
        └──────── HTTPS / JSON (JWT) ──────────┘
                           │
                 ┌─────────▼─────────┐
                 │ Express REST API  │
                 │  /api/<module>    │
                 └─────────┬─────────┘
                           │ Mongoose
                    ┌──────▼──────┐
                    │  MongoDB    │
                    └─────────────┘
```

## Backend conventions
Each module has `models/<Name>.js`, `controllers/<name>Controller.js` and
`routes/<name>Routes.js`. Route files export `{ basePath, router }` and are
loaded automatically by `routes/index.js`.

## Front-end conventions
- Customer portal pages live in `frontend/src/pages/entities/` and export `meta`.
- Admin modules live in `admin/src/pages/modules/<name>/` (`List.jsx` + `Form.jsx`).
- Mobile screens are listed in `mobile/src/screens/registry.js`.

## Roles
| Role | Access |
|------|--------|
| admin | everything, including deletes |
| staff | create / update records |
| customer | read access via customer portal and mobile app |
