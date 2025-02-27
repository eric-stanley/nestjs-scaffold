# Authentication Microservice

This is an authentication microservice built with NestJS. It handles user authentication using JWT (JSON Web Tokens) and integrates with Google OAuth.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd auth
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm run start:dev
    ```

2. The application will be running at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/auth
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
