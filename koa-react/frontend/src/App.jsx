import { useEffect, useState } from "react";
import TodoCard from "./components/todo.card";

function App() {
   const BASE_URL = "http://localhost:4000";
   const headers = { "Content-Type": "application/json" };

   const [todo, setTodo] = useState();
   const [newTitle, setNewTitle] = useState("");
   const [loading, setLoading] = useState(false);

   async function fetchTodo() {
      setLoading(() => true);
      try {
         const res = await fetch(BASE_URL);
         if (!res.ok) throw new Error("failed to fetch");
         const data = await res.json();

         setTodo(() => data);
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
         console.error(err);
      }
   }

   const handleNew = async () => {
      setLoading(() => true);
      try {
         const payload = { title: newTitle };

         const res = await fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(payload),
            headers,
         });

         if (!res.ok) throw new Error("Failed to update");

         await fetchTodo();
         setLoading(() => false);
         setNewTitle(() => "");
      } catch (err) {
         setLoading(() => false);
         console.error(err);
      }
   };

   const handleEdit = async (id, title) => {
      setLoading(() => true);
      try {
         const payload = { title };

         const res = await fetch(BASE_URL + "/" + id, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers,
         });

         if (!res.ok) throw new Error("Failed to update");

         await fetchTodo();
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
         console.error(err);
      }
   };

   const handleCompleted = async (id) => {
      try {
         setLoading(() => true);

         const payload = { completed: true };

         const res = await fetch(BASE_URL + "/" + id, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers,
         });

         if (!res.ok) throw new Error("Failed to update");

         await fetchTodo();
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
         console.error(err);
      }
   };

   const handleDelete = async (id) => {
      try {
         setLoading(() => true);

         const res = await fetch(BASE_URL + "/" + id, {
            method: "DELETE",
         });

         if (!res.ok) throw new Error("Failed to delete");

         await fetchTodo();
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
         console.error(err);
      }
   };

   useEffect(() => {
      fetchTodo();
   }, []);

   // forcing rerender page
   if (loading)
      return (
         <div className="App">
            <div>Loading data..</div>
         </div>
      );

   if (!todo?.length)
      return (
         <div className="App">
            <div>No Data</div>
         </div>
      );

   const handleChange = (e) => {
      const { value } = e.target;
      setNewTitle(() => value);
   };

   return (
      <div className="App">
         <div style={{ margin: "2rem", display: "flex", gap: "2rem" }}>
            <input
               type="text"
               name="title"
               onChange={handleChange}
               value={newTitle}
            />
            <button
               onClick={handleNew}
               style={{ width: "7rem", height: "2rem" }}
            >
               Add New Todo
            </button>
         </div>
         {todo.map((td) => (
            <TodoCard
               todo={td}
               key={`todo-${td.id}`}
               editFunc={handleEdit}
               completeFunc={handleCompleted}
               deleteFunc={handleDelete}
            />
         ))}
      </div>
   );
}

export default App;
