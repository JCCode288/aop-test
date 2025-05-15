import express from "express";
import DataProvider from "./data.provider";

const app = express();
const port = 3000;

const dataProvider = new DataProvider();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/data", (req, res) => {
   res.json(dataProvider.data);
});

app.post("/data", (req, res) => {
   const newData = req.body;

   if (!newData) {
      res.status(400).json({ error: "invalid payload" });
      return;
   }

   dataProvider.add(newData);

   res.status(201).json(newData);
});

app.put("/data/:id", (req, res) => {
   const id = req.params?.id;
   if (!id || isNaN(+id)) {
      res.status(400).json({ error: "invalid id" });
      return;
   }

   const updatedData = req?.body;
   if (!updatedData) {
      res.status(400).json({ error: "invalid payload" });
      return;
   }

   if (!dataProvider.check(+id)) {
      res.status(404).json({ error: "data not found" });
      return;
   }

   dataProvider.update(+id, updatedData);

   res.status(201).json(updatedData);
});

app.delete("/data/:id", (req, res) => {
   let id = req.params?.id;
   if (!id || isNaN(+id)) {
      res.status(400).json({ error: "invalid id" });
      return;
   }

   if (!dataProvider.check(+id)) {
      res.status(404).json({ error: "data not found" });
      return;
   }

   dataProvider.delete(+id);

   res.status(200).json({ message: "Data deleted" });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
