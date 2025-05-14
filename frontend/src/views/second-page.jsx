import { useState } from "react";
import PageButton from "../components/page-button";
import useInitialData from "../hooks/useInitialData";

function validateForm(data) {
   const errors = [];
   for (const key in data) {
      if (!data[key]) errors.push(key);
   }

   return errors;
}

export default function SecondPage() {
   const { handleNavigation } = useInitialData("/third");

   const [form, setForm] = useState({
      name: "",
      email: "",
   });

   const handleSubmit = (e) => {
      e.preventDefault();

      const errors = validateForm(form);
      if (errors.length) {
         const errString = `${errors.join(", ")} is not filled`;
         return alert(errString);
      }

      const doneString = `username ${form.name} with email ${form.email} has been submitted`;
      return alert(doneString);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (!name) return;

      setForm((prev) => ({ ...prev, [name]: value }));
   };

   return (
      <div>
         <h1>Second Question</h1>
         <div style={{ display: "flex", justifyContent: "center" }}>
            <form
               style={{
                  display: "flex",
                  width: "fit",
                  flexDirection: "column",
                  gap: "0.2rem",
                  paddingTop: "1.5rem",
                  paddingBottom: "1.5rem",
               }}
               onSubmit={handleSubmit}
            >
               <div style={{ display: "flex", gap: "1rem" }}>
                  <label htmlFor="name">User Name</label>
                  <input
                     onChange={handleChange}
                     type="text"
                     name="name"
                     value={form.name}
                  />
               </div>
               <div style={{ display: "flex", gap: "1rem" }}>
                  <label htmlFor="email">User Email</label>
                  <input
                     onChange={handleChange}
                     type="text"
                     name="email"
                     value={form.email}
                  />
               </div>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     marginTop: "0.5rem",
                  }}
               >
                  <button
                     style={{ display: "flex", width: "fit" }}
                     type="submit"
                  >
                     Submit
                  </button>
               </div>
            </form>
         </div>
         <PageButton func={handleNavigation} />
      </div>
   );
}
