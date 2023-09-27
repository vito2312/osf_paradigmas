import fs from 'fs/promises';
import path from 'path';

const raFakeFilePath = path.join(process.cwd(), '/src/ra_fake.txt');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Lee el contenido del archivo ra_fake.txt
      const scriptContent = await fs.readFile(raFakeFilePath, 'utf8');

      // Devuelve el contenido como resultado de la evaluación
      res.status(200).json({ success: true, result: scriptContent });

    } catch (error) {
      console.error('Error al leer el archivo ra_fake.txt:', error);
      res.status(500).json({ success: false, error: 'Error al leer el archivo ra_fake.txt.' });
    }
  } else {
    res.status(405).end();
  }
}
