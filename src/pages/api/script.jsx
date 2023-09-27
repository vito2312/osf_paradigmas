
const fs = require('fs');
const path = require('path');


const scriptsDirectory = path.join(process.cwd(), '/src/scripts');


export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const scriptFilePath = path.join(scriptsDirectory, `${id}.txt`);
    try {
      const scriptContent = fs.readFileSync(scriptFilePath, 'utf8');
      res.status(200).send(scriptContent);
    } catch (error) {
      console.error('Error al cargar el script:', error);
      res.status(500).json({ error: 'Error al cargar el script' });
    }
  } else {
    res.status(405).end();

  }
}
