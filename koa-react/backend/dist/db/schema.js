"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.todos = (0, pg_core_1.pgTable)("todos", {
    id: (0, pg_core_1.serial)().notNull(),
    title: (0, pg_core_1.text)().notNull(),
    completed: (0, pg_core_1.boolean)().default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" })
        .defaultNow()
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "string" })
        .defaultNow()
        .notNull(),
});
