# Smart E-Commerce Backend

A comprehensive e-commerce backend built with Spring Boot, featuring user authentication, product management, and secure transactions.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [License](#license)

## Features
- User authentication and authorization with JWT
- Secure password management
- Product catalog management
- RESTful API design
- Database integration with PostgreSQL
- API documentation with Swagger/OpenAPI
- Data validation
- Security best practices
- Database migration with Flyway

## Technologies Used
- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (JSON Web Tokens)
- Lombok
- MapStruct
- Flyway
- Maven
- OpenAPI (Swagger)

## Prerequisites
- Java 17 or higher
- Maven 3.6.0 or higher
- PostgreSQL database
- Git

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-ecommerce
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

## Configuration
The application can be configured using the `application.properties` or `application.yml` file. Key configurations include:

- Database connection settings
- JWT secret and expiration time
- Server port
- Logging levels

Example configuration would typically include:
- `spring.datasource.url` - Database connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `jwt.secret` - JWT signing secret
- `jwt.expiration` - Token expiration time

## API Documentation
API documentation is available through Swagger UI at:
- `http://localhost:8080/swagger-ui.html` (HTML interface)
- `http://localhost:8080/v3/api-docs` (JSON format)

## Project Structure
```
src/
├── main/
│   ├── java/
│   │   └── com/company/smartecommerce/
│   │       ├── controller/      # REST controllers
│   │       ├── service/         # Business logic
│   │       ├── model/           # Entity and DTO classes
│   │       ├── repository/      # Database repositories
│   │       ├── config/          # Configuration classes
│   │       ├── security/        # Security configuration
│   │       └── util/            # Utility classes
│   └── resources/
│       ├── application.properties  # Configuration properties
│       └── db/                    # Database migration scripts
└── test/
    └── java/                     # Unit and integration tests
```

## Running the Application
You can run the application using:
```bash
mvn spring-boot:run
```

Or build a JAR file and run it:
```bash
mvn clean package
java -jar target/smart-ecommerce-0.0.1-SNAPSHOT.jar
```

## Testing
To run the tests:
```bash
mvn test
```

For a specific test:
```bash
mvn test -Dtest=TestClassName
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
