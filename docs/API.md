# API Reference

Base URL: `http://localhost:5000/api` - send `Authorization: Bearer <token>` on protected routes.

## Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/register | Create customer account |
| POST | /auth/login | Get JWT |
| GET | /auth/me | Current user |

## Modules
Every module exposes the same REST shape:

| Method | Path | Roles |
|--------|------|-------|
| GET | /<module>?q=&page=&limit= | any signed-in user |
| GET | /<module>/:id | any signed-in user |
| POST | /<module> | admin, staff |
| PUT | /<module>/:id | admin, staff |
| DELETE | /<module>/:id | admin |

Modules: products, customers, suppliers, orders, shipments, containers, ports, carriers,
warehouses, invoices, payments, quotations, customs-declarations, hs-codes, documents,
tracking-events, countries, currencies, notifications, reports.

List responses: `{ success, items, total, page, pages }`
