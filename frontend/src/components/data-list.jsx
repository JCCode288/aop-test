export default function DataList({ data }) {
   return (
      <li>
         <ul>
            <li
               style={{
                  display: "flex",
                  gap: "0.5rem",
                  textAlign: "center",
               }}
            >
               <p>User ID :</p> <p>{data.userId}</p>
            </li>
            <li
               style={{
                  display: "flex",
                  gap: "0.5rem",
                  textAlign: "center",
               }}
            >
               <p>Title :</p> <p>{data.title}</p>
            </li>
            <li
               style={{
                  display: "flex",
                  gap: "0.5rem",
                  textAlign: "center",
               }}
            >
               <p>Body :</p> <p>{data.body}</p>
            </li>
            <li
               style={{
                  display: "flex",
                  gap: "0.5rem",
                  textAlign: "center",
               }}
            >
               <p>Row ID :</p> <p>{data.id}</p>
            </li>
         </ul>
      </li>
   );
}
