import { drizzle } from 'drizzle-orm/postgres-js'
import { usersTable } from './db/schema';

require('dotenv').config()

if(!process.env.DATABASE_URL) {
    throw Error("process.env.DATABASE_URL is undefined");
}

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const user: typeof usersTable.$inferInsert = {
        name: 'John',
        age: 30,
        email: 'john@example.com',
      };
    
      await db.insert(usersTable).values(user);
      console.log('New user created!')
}

main();