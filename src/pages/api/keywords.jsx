import fs from 'fs';
import path from 'path';


function loadKeywordsList() {
    const keywordsFilePath = path.join(process.cwd(), '/src/keywords.json');
    try {
      const keywordsData = fs.readFileSync(keywordsFilePath, 'utf8');
      return JSON.parse(keywordsData); // Debes retornar los datos analizados
    } catch (error) {
      console.error('Error loading keywords list:', error);
      return [];
    }
  }
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      const keywordsList = loadKeywordsList();
      return res.status(200).json({ keywords: keywordsList });
    } else {
      return res.status(405).end(); // Método no permitido
    }
  }
  