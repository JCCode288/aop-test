export default function PageButton({ label = "Next Page", func }) {
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "start",
            margin: "4rem",
         }}
      >
         <button onClick={func}>{label}</button>
      </div>
   );
}
