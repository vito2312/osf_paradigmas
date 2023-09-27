
import fs from 'fs';
import path from 'path';

const aboutDataFilePath = path.join(process.cwd(), '/src/infoMembers.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Lee el contenido del archivo JSON
      const aboutData = JSON.parse(fs.readFileSync(aboutDataFilePath, 'utf8'));

      // Devuelve los datos en formato JSON
      res.status(200).json(aboutData);
    } catch (error) {
      console.error('Error al cargar datos de About:', error);
      res.status(500).json({ error: 'Error al cargar datos de About' });
    }
  } else {
    // Manejar otras solicitudes (por ejemplo, POST, PUT, DELETE) aquí si es necesario
    res.status(405).end(); // Método no permitido
  }
}
