import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: "file:database.sqlite",
});

export const db = drizzle(client);

export { client };