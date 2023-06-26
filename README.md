```
npm install
npm run dev # for development
npm run start # for production
```

```
open http://localhost:8080
```

## Database

By default, this template used `mysql` database with `mysql2` driver. You can change to your own  database by installing it's driver (if it's other than MySQL) and change db connection in `src/lib/db/index.ts` file. 

This project used Prisma for schema & migration feature. But used Kysely instead of Prisma-client for database query to get better performance. Details here: https://github.com/kysely-org/kysely

