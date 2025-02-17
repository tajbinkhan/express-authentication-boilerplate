# Express Authentication Server

A secure authentication server built with Express.js featuring comprehensive security measures and
modern authentication capabilities.

## Features

- 🔐 **Authentication**

  - Local authentication with Passport.js
  - Google OAuth 2.0 integration
  - JWT token-based authentication
  - Session-based authentication
  - Custom authentication strategies

- 🛡️ **Security**

  - CSRF protection
  - Helmet security headers
  - Rate limiting
  - CORS configuration
  - Secure cookie handling
  - Input validation with Zod

- 📦 **Database**

  - PostgreSQL with Drizzle ORM
  - MongoDB with Mongoose
  - Database migrations
  - Seeding support
  - Studio for database management

- 🔧 **Core Features**
  - TypeScript support
  - WebSocket support (Socket.IO)
  - File upload handling with Multer
  - Image processing with Sharp
  - Email sending with Nodemailer
  - Environment configuration
  - ESLint + Prettier code quality
  - Husky git hooks

## Getting Started

### Prerequisites

- Node.js (18+)
- PostgreSQL
- MongoDB
- pnpm (recommended)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` to `.env` and configure your environment variables

4. Initialize the database:

```bash
pnpm db:generate   # Generate migrations
pnpm db:push      # Push schema to database
pnpm db:seed      # Seed initial data
```

5. Start development server:

```bash
pnpm dev
```

## Available Scripts

```bash
pnpm build          # Build for production
pnpm start          # Start production server
pnpm dev            # Start development server
pnpm format         # Format code with Prettier
pnpm lint           # Lint code with ESLint
pnpm type-check     # Check TypeScript types
pnpm db:studio      # Open Drizzle database studio
pnpm db:generate    # Generate database migrations
pnpm db:migrate     # Run database migrations
pnpm db:push        # Push schema changes
pnpm db:seed        # Seed database
```

## Technology Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Databases**:
  - PostgreSQL (Drizzle ORM)
  - MongoDB (Mongoose)
- **Authentication**:
  - Passport.js
  - JWT (jose)
  - Session
- **Security**:
  - Helmet
  - CSRF-CSRF
  - Express Rate Limit
  - CORS
- **Utils**:
  - Socket.IO
  - Sharp
  - Nodemailer
  - Multer
  - Zod
- **Development**:
  - ESLint
  - Prettier
  - Husky
  - lint-staged
  - tsx/tsup

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
