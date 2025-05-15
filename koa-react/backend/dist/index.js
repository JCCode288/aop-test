"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const db_1 = __importDefault(require("./db"));
const schema_1 = require("./db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const cors_1 = __importDefault(require("@koa/cors"));
const app = new koa_1.default();
const router = new router_1.default();
const PORT = 4000;
router.get("/", function (_a, next_1) {
    return __awaiter(this, arguments, void 0, function* ({ request, response }, next) {
        try {
            const datas = yield db_1.default.select().from(schema_1.todos);
            response.body = datas;
            return yield next();
        }
        catch (err) {
            response.status = 500;
            response.body = { message: "Internal Server Error" };
            return yield next();
        }
    });
});
router.post("/", function (_a, next_1) {
    return __awaiter(this, arguments, void 0, function* ({ request, response }, next) {
        try {
            const payload = request.body;
            if (!payload) {
                response.status = 400;
                response.body = { message: "invalid payload" };
                return yield next();
            }
            const inserted = yield db_1.default.insert(schema_1.todos).values(payload).returning();
            response.status = 201;
            response.body = inserted;
            return yield next();
        }
        catch (err) {
            response.status = 500;
            response.body = { message: "Internal Server Error" };
            return yield next();
        }
    });
});
router.get("/:id", function (_a, next_1) {
    return __awaiter(this, arguments, void 0, function* ({ request, response, params }, next) {
        try {
            const query = params;
            if (!query.id) {
                response.status = 400;
                response.body = { message: "invalid id" };
                return yield next();
            }
            const todoDatas = yield db_1.default
                .select()
                .from(schema_1.todos)
                .where((0, drizzle_orm_1.eq)(schema_1.todos.id, query.id))
                .limit(1);
            if (!todoDatas.length) {
                response.status = 400;
                response.body = { message: "invalid id" };
                return yield next();
            }
            response.body = todoDatas[0];
            return yield next();
        }
        catch (err) {
            response.status = 500;
            response.body = { message: "Internal Server Error" };
            return yield next();
        }
    });
});
router.put("/:id", function (_a, next_1) {
    return __awaiter(this, arguments, void 0, function* ({ request, response, params }, next) {
        try {
            const query = params;
            if (!query.id) {
                response.status = 400;
                response.body = { message: "invalid id" };
                return yield next();
            }
            const payload = request.body;
            if (!payload) {
                response.status = 400;
                response.body = { message: "invalid payload" };
                return yield next();
            }
            const todoDatas = yield db_1.default
                .select()
                .from(schema_1.todos)
                .where((0, drizzle_orm_1.eq)(schema_1.todos.id, query.id))
                .limit(1);
            if (!todoDatas.length) {
                response.status = 400;
                response.body = { message: "invalid id" };
                return yield next();
            }
            const updatedData = Object.assign(Object.assign({}, todoDatas[0]), payload);
            const updated = yield db_1.default
                .update(schema_1.todos)
                .set(updatedData)
                .where((0, drizzle_orm_1.eq)(schema_1.todos.id, query.id))
                .returning();
            response.status = 201;
            response.body = updated;
            return yield next();
        }
        catch (err) {
            response.status = 500;
            response.body = { message: "Internal Server Error" };
            return yield next();
        }
    });
});
router.delete("/:id", function (_a, next_1) {
    return __awaiter(this, arguments, void 0, function* ({ request, response, params }, next) {
        try {
            const query = params;
            if (!query.id) {
                response.status = 400;
                response.body = { message: "invalid id" };
                return yield next();
            }
            const payload = request.body;
            if (!payload) {
                response.status = 400;
                response.body = { message: "invalid payload" };
                return yield next();
            }
            const todoDatas = yield db_1.default
                .select()
                .from(schema_1.todos)
                .where((0, drizzle_orm_1.eq)(schema_1.todos.id, query.id))
                .limit(1);
            if (!todoDatas.length) {
                response.status = 400;
                response.body = { message: "invalid id" };
                return yield next();
            }
            const deleted = yield db_1.default
                .delete(schema_1.todos)
                .where((0, drizzle_orm_1.eq)(schema_1.todos.id, query.id))
                .returning();
            response.status = 201;
            response.body = deleted;
            return yield next();
        }
        catch (err) {
            response.status = 500;
            response.body = { message: "Internal Server Error" };
            return yield next();
        }
    });
});
app.use((0, cors_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_bodyparser_1.default)());
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT);
