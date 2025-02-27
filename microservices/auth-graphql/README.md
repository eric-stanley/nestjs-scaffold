# Authentication GraphQL Microservice

This is an authentication microservice built with Apollo Server. It uses GraphQL to provide authentication functionalities, including JWT (JSON Web Tokens) for secure user authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [GraphQL Schema](#graphql-schema)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd auth-graphql
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm run start
    ```

2. The application will be running at `http://localhost:4000/graphql`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
JWT_SECRET=your_secret_key
