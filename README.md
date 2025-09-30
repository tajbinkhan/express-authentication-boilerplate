# Express Authentication Boilerplate

---

## ⚠️ **DISCONTINUED** ⚠️

**This project is no longer maintained.**

🚀 **Please migrate to the latest version:**
[express-authentication-v2](https://github.com/tajbinkhan/express-authentication-v2.git)

---

A comprehensive authentication system built with Express.js and TypeScript, providing
enterprise-grade security features and multiple authentication strategies.

## Features

- **Multiple Authentication Methods**

  - Local authentication (username/email + password)
  - Google OAuth 2.0 integration
  - JWT-based authentication
  - Session-based authentication

- **Database Support**

  - PostgreSQL integration with Drizzle ORM
  - Database migration and seeding tools

- **Security Features**

  - Password hashing with bcrypt
  - CSRF protection
  - Rate limiting
  - Helmet security headers
  - Input validation with Zod
  - Secure cookie handling

- **User Management**

  - User registration and authentication
  - Role-based access control
  - Password reset functionality
  - Email verification
  - Account management

- **Developer Experience**
  - TypeScript support
  - Nodemon for development
  - ESLint and Prettier configuration
  - Husky pre-commit hooks
  - Comprehensive tooling for database management

## Tech Stack

- **Backend**: Node.js, Express
- **Language**: TypeScript
- **Authentication**: Passport.js, JWT
- **Database**: PostgreSQL (with Drizzle ORM)
- **Email**: Nodemailer
- **Image Processing**: Sharp
- **Validation**: Zod
- **Development Tools**: ESLint, Prettier, Husky, Lint-staged

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/express-authentication-boilerplate.git

# Navigate to the project directory
cd express-authentication-boilerplate

# Install dependencies
npm install
# or
pnpm install
```

## Environment Setup

Configure your environment variables in the `.env` file:

```
# Database Configuration
DATABASE_URL="your-postgres-connection-string"

# Server Configuration
PORT="8080"
NODE_ENV="development"

# Session & JWT Configuration
SECRET="your-secret-key"
JWT_COOKIE_NAME="jwt-token"
SESSION_COOKIE_NAME="session-id"

# CORS Configuration
ORIGIN_URL="http://localhost:3000"
API_URL="http://localhost:8080"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:8080/auth/google/callback"

# Email Configuration
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="Your Name <your-email@example.com>"
```

## Available Scripts

```bash
# Development mode
npm run dev

# Build the project
npm run build

# Start production server
npm start

# Format code
npm run format

# Lint code
npm run lint

# Type checking
npm run type-check

# Database operations
npm run db:studio        # Open Drizzle Studio
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
npm run db:clear         # Clear database
npm run db:seed          # Seed database
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user
- `GET /auth/logout` - Log out a user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `GET /auth/verify-email/:token` - Verify email address
- `GET /auth/me` - Get current user information
- `GET /auth/google` - Google OAuth authentication
- `GET /auth/google/callback` - Google OAuth callback

## Database Management

The project uses Drizzle ORM for database operations, providing:

- Type-safe SQL query building
- Migrations management
- Database schema visualization with Drizzle Studio
- Seeding capabilities for development

## Security Implementations

- **Password Security**: Passwords are hashed using bcrypt
- **CSRF Protection**: Using csrf-csrf package
- **XSS Prevention**: Helmet security headers
- **Rate Limiting**: Express rate limiter to prevent brute force attacks
- **Input Validation**: Schema validation with Zod
- **Secure Cookies**: HTTP-only, secure cookies for tokens and sessions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
