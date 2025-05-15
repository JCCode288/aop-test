import {
   pgTable,
   serial,
   text,
   boolean,
   timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
   id: serial().notNull(),
   title: text().notNull(),
   completed: boolean().default(false).notNull(),
   createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
   updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
});
