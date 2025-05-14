import { useState } from "react";
import PageButton from "../components/page-button";
import useInitialData from "../hooks/useInitialData";
import { validateForm } from "../utils/form.validation";

export default function SecondPage() {
   const {
      handleNavigation,
      back,
      data = {
         name: "",
         email: "",
      },
   } = useInitialData("/third");

   const [form, setForm] = useState(() => data);

   const handleSubmit = (e) => {
      e.preventDefault();

      const errors = validateForm(form);
      if (errors.length) {
         const errString = errors.join("\n");
         return alert(errString);
      }

      const doneString = `username ${form.name} with email ${form.email} has been submitted`;

      alert(doneString);

      setForm(() => data);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (!name) return;

      setForm((prev) => ({ ...prev, [name]: value }));
   };

   return (
      <div>
         <h1>Second Question</h1>
         <PageButton label="back" func={back} />
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
