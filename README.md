# Express TypeScript Boilerplate

Modern Express.js application with TypeScript, featuring robust authentication, session management,
and structured architecture.

## 🚀 Features

- TypeScript implementation
- JWT & Session authentication
- Google OAuth integration
- Custom session store with Drizzle ORM
- CSRF protection
- Rate limiting
- Structured error handling
- API response standardization

## 📁 Project Structure

```bash
├── src/
│   ├── app/
│   │   ├── authentication/
│   │   │   ├── Authentication.controller.ts
│   │   │   ├── Authentication.routes.ts
│   │   │   ├── Authentication.service.ts
│   │   │   └── Authentication.JWT.ts
│   │   └── ...
│   ├── database/
│   │   ├── db.ts
│   │   └── schema.ts
│   ├── middlewares/
│   │   ├── authentication.middleware.ts
│   │   └── error.middleware.ts
│   ├── passport/
│   │   ├── PassportCustom.ts
│   │   └── PassportJWT.ts
│   ├── session/
│   │   └── CustomSessionStore.ts
│   ├── utils/
│   │   ├── AppHelpers.ts
│   │   ├── CSRF.ts
│   │   └── ServiceApi.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## Setup

Install Dependencies

```bash
pnpm install
```

Environment Configuration `.env.example` to `.env`:

```bash
PORT=3000
SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Database Setup

```bash
pnpm db:generate
pnpm db:push
```

Start Development Server

```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production
- `pnpm start` - Start production server
- `pnpm db:push` - Update database schema

## Authentication

Supports multiple authentication methods:

- JWT token-based
- Session-based
- Google OAuth

```bash
// Login Example
POST /api/auth/login
{
  "username": "user@example.com",
  "password": "password123"
}
```

## Security Features

- Session Management
- CSRF Protection
- Rate Limiting
- Secure Cookie Configuration
- Input Validation

## API Response Format

```bash
{
  "status": number,
  "message": string,
  "data": any
}
```

## Core Dependencies

- express
- typescript
- passport
- drizzle-orm
- express-session
- cookie-parser
- helmet

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

[MIT License](https://choosealicense.com/licenses/mit/)
