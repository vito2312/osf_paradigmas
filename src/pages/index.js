
import { API_SERVER_URL } from "@/components/Url";

import TextEditor from "@/components/TextEditor";

const fetchGets = () =>{

  return fetch(`${API_SERVER_URL}/keywords`)
  .then(res=> res.json())
  .catch(error => console.error('Error fetching keywords:', error))
}

export default async function Home() {
 const keywordsList = await fetchGets();
  return (
    <>
     <div className="App">
          <TextEditor keywordsList={keywordsList} />
      </div>
    </>
  )
}
