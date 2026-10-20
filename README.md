# LogiCare Export

A complete **import & export management platform** for freight forwarders, exporters and
customs brokers. One codebase with four apps:

| App | Path | Stack |
|-----|------|-------|
| REST API | `backend/` | Node.js, Express, MongoDB (Mongoose), JWT |
| Customer portal (responsive / mobile web) | `frontend/` | React 18, Vite, React Router |
| Admin panel | `admin/` | React 18, Vite, React Router |
| Mobile app | `mobile/` | React Native (Expo), React Navigation |

## Modules
Products, Customers, Suppliers, Orders, Shipments, Containers, Ports, Carriers, Warehouses,
Invoices, Payments, Quotations, Customs Declarations, HS Codes, Documents, Tracking Events,
Countries, Currencies, Notifications and Reports.

## Quick start
```bash
docker compose up -d mongo
cd backend  && npm install && cp .env.example .env && node src/seed.js && npm run dev
cd frontend && npm install && npm run dev      # http://localhost:5173
cd admin    && npm install && npm run dev      # http://localhost:5174
cd mobile   && npm install && npx expo start
```
Default admin (from seed): `admin@logicare.com` / `Admin@123`

See `docs/` for API reference, architecture and deployment notes.
