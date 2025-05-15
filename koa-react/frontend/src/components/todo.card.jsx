import { useState } from "react";

export default function TodoCard({
   todo,
   editFunc,
   completeFunc,
   deleteFunc,
}) {
   const [titleData, setTitleData] = useState(todo.title);
   const [edited, setEdited] = useState(() => false);

   const handleEditInput = (e) => {
      const { value } = e.target;

      setEdited(() => true);
      setTitleData(() => value);
   };

   const handleEdit = async () => {
      if (!edited) return;
      await editFunc(todo.id, titleData);
      setEdited(() => false);
   };

   const handleComplete = async () => {
      if (todo.completed) return;
      await completeFunc(todo.id);
   };

   const handleDelete = async () => {
      await deleteFunc(todo.id);
   };

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            border: "1px",
            color: "black",
            width: "fit-content",
         }}
      >
         <div
            style={{
               display: "flex",
               width: "100%",
               justifyContent: "space-between",
            }}
         >
            <div style={{ display: "flex", gap: "1rem" }}>
               <input
                  style={{
                     margin: 0,
                     padding: 2,
                     fontSize: "1.1rem",
                     border: "none",
                  }}
                  onChange={handleEditInput}
                  value={titleData}
               />
               ({todo.completed ? "completed" : "on going"})
            </div>
            <div
               style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <button onClick={handleEdit} disabled={!edited}>
                  Edit
               </button>
               <button onClick={handleComplete} disabled={todo.completed}>
                  Mark as Completed
               </button>
               <button onClick={handleDelete}>Delete</button>
            </div>
         </div>
         <div
            style={{
               display: "flex",
               gap: "2rem",
               justifyContent: "space-between",
            }}
         >
            <p>Created: {todo.createdAt}</p>
            <p>Last Update: {todo.updatedAt}</p>
         </div>
      </div>
   );
}
