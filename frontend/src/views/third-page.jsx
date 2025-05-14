import DataList from "../components/data-list";
import PageButton from "../components/page-button";
import useInitialData from "../hooks/useInitialData";

export default function ThirdPage() {
   const {
      handleNavigation,
      data: { posts },
   } = useInitialData("/fourth");

   console.log(posts);

   return (
      <div>
         <h1>Third Question</h1>
         <div style={{ display: "flex" }}>
            <ul>
               {posts.map((p) => (
                  <DataList data={p} key={p.id} />
               ))}
            </ul>
         </div>

         <PageButton func={handleNavigation} />
      </div>
   );
}
