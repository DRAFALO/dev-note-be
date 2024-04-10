## How to run this project 
Seed data using `yarn seed` then run project with `yarn dev` and access [http://localhost:3000/api/v1](http://localhost:3000/api/v1) to find swagger page


## Project structures

```shell
|-- /src
  |    |-- /modules
  |    |    |-- /auth              # Authentication module
  |    |    |    |-- auth.controller.ts
  |    |    |    |-- auth.service.ts
  |    |    |    |-- auth.module.ts
  |    |    |    +-- /guards       # Guards for authentication
  |    |    |-- /users             # User management module
  |    |    |    |-- users.controller.ts
  |    |    |    |-- users.service.ts
  |    |    |    |-- users.module.ts
  |    |    |-- /articles          # Article management module
  |    |    |    |-- articles.controller.ts
  |    |    |    |-- articles.service.ts
  |    |    |    |-- articles.module.ts
  |    |    |    +-- /entities     # Database entities (e.g., ArticleEntity)
  |    |    |-- /tags              # Tag management module
  |    |    |    |-- tags.controller.ts
  |    |    |    |-- tags.service.ts
  |    |    |    |-- tags.module.ts
  |    |    |-- /comments          # Comment management module
  |    |         |-- comments.controller.ts
  |    |         |-- comments.service.ts
  |    |         |-- comments.module.ts
  |    |-- /shared                 # Shared modules, utilities, and constants
  |    |    |-- /middlewares       # Custom middleware
  |    |    |-- /interceptors      # HTTP interceptors
  |    |    |-- /decorators        # Custom decorators
  |    |    |-- /filters           # Exception filters
  |    |    |-- /loggers           # Log middlware
  |    |    |-- /seeds             # Seed data
  |    |    +-- /utils             # Utility functions
  |    |-- cli.ts                 # Custom commandline
  |    |-- app.module.ts          # Main application module
  |    |-- main.ts                # Entry point of the application
  ```