import { API_SERVER_URL } from "@/components/Url";
import TextEditor from "@/components/TextEditor";
import { useEffect, useState } from "react";
import About from '@/components/About';

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
  }
};

export default function Home() {
  const [keywordsList, setKeywordsList] = useState([]);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);

  useEffect(() => {
    fetchKeywords()
      .then(keywords => setKeywordsList(keywords))
      .catch(error => console.error('Error fetching keywords:', error));
  }, []);

  const openAboutPopup = () => {
    setIsAboutPopupOpen(true);
  };

  const closeAboutPopup = () => {
    setIsAboutPopupOpen(false);
  };

  return (
    <div className="Home">
      <button onClick={openAboutPopup}>About</button>
      <h1>One Flow Stream</h1>
      <TextEditor keywordsList={keywordsList} />

      {isAboutPopupOpen && <About />}

      {isAboutPopupOpen && <button onClick={closeAboutPopup}>Cerrar About</button>}
    </div>
  );
}
