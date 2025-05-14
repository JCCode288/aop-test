export default function PageButton({ label = "Next Page", func }) {
   return (
      <div style={{ display: "flex", justifyContent: "center" }}>
         <button onClick={func}>{label}</button>
      </div>
   );
}
