# NestJS Microservices Project

This project is a collection of microservices built using NestJS. It leverages the modular and scalable architecture of NestJS to provide various functionalities as separate, manageable services.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Communication](#communication)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Overview

This repository contains multiple microservices designed to work together seamlessly. Each microservice is responsible for a specific domain or functionality, allowing for a decoupled and maintainable system.

## Architecture

The project follows a microservices architecture, where each service runs independently and communicates with other services via APIs or message brokers. The main components include:

- **Gateway:** Acts as the entry point for client requests.
- **Microservices:** Independent services handling specific functionalities.
- **Database:** Each microservice has its own database schema.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd nestjs-microservices
    ```

2. Install the dependencies for each microservice:

    ```bash
    cd <microservice-directory>
    npm install
    ```

## Usage

1. Start each microservice:

    ```bash
    npm run start:dev
    ```

2. The services will be running on their respective ports as specified in their configurations.

## Environment Variables

Each microservice requires specific environment variables. Create a `.env` file in the root directory of each microservice and add the necessary variables. Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
