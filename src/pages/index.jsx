import { API_SERVER_URL } from "@/components/Url";
import TextEditor from "@/components/TextEditor";
import { useEffect, useState } from "react";


const fetchKeywords = async () => {
  try {
    const res = await fetch(`${API_SERVER_URL}/keywords`);
    if (!res.ok) {
      throw new Error('La solicitud no tuvo éxito.');
    }
    const data = await res.json();
    return data.keywords || [];
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return [];
  }S
};

export default function Home() {
  const [keywordsList, setKeywordsList] = useState([]);

  useEffect(() => {
    fetchKeywords()
      .then(keywords => setKeywordsList(keywords))
      .catch(error => console.error('Error fetching keywords:', error));
  }, []);


  return (
    <div className="Home">
      <h1>One Flow Stream</h1>
      <TextEditor keywordsList={keywordsList} />

    </div>
  );
}
