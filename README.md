# Express Authentication Server

A secure authentication server built with Express.js featuring comprehensive security measures and
modern authentication capabilities.

## Features

- 🔐 **Authentication**

  - Custom authentication strategy
  - Google OAuth integration
  - Session-based authentication
  - Passport.js integration

- 🛡️ **Security**

  - CSRF protection
  - Helmet security headers
  - Rate limiting
  - CORS configuration
  - Cookie security

- 🔧 **Core Features**
  - MongoDB integration
  - WebSocket support (Socket.IO)
  - File upload handling
  - Request logging
  - Error handling middleware
  - Environment configuration

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the server:

```bash
npm run dev
```

## API Endpoints

The server will be available at:

- Local: http://localhost:8080
- WebSocket: ws://localhost:8080
- Network: http://your_ip:8080

## Technology Stack

- Express.js
- MongoDB
- Socket.IO
- Passport.js
- Helmet
- CORS
- Cookie Parser
- Express Session

## Security Features

- Double CSRF Protection
- Rate Limiting
- Secure Sessions
- Helmet Security Headers
- CORS Configuration
- Error Handling

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
