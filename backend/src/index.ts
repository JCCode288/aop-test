import express from "express";
import todoRouter from "./modules/todo/routes";
import userRouter from "./modules/user/routes";
import errorHandler from "./modules/errorHandler";

const app = express();
const PORT = 3001;

// app.use(cors()) // not needed yet
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todo", todoRouter);
app.use("/users", userRouter);

app.use(errorHandler);

app.listen(PORT, (err) => {
   if (err) return console.error(err);
   console.log(`listening to http://localhost:${PORT}`);
});
