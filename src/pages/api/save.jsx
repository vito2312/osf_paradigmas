import fs from 'fs/promises';
import path from 'path';

const scriptsDirectory = path.join(process.cwd(), '/src/scripts');
const EXTENSION_DEFAULT = 'txt';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Utiliza bodyParser.json() para analizar el cuerpo JSON de la solicitud
      const { extension, fileName, scriptContent } = req.body;

      if(extension === fileName){
        const filePath = path.join(scriptsDirectory, `${fileName}.${EXTENSION_DEFAULT}`); // Utiliza el nombre personalizado
        await fs.writeFile(filePath, scriptContent, 'utf8');
      }else{
        const filePath = path.join(scriptsDirectory, `${fileName}.${extension}`); // Utiliza el nombre personalizado
        await fs.writeFile(filePath, scriptContent, 'utf8');
      }
      res.status(200).json({ success: true, message: 'Archivo guardado exitosamente.' });
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      res.status(500).json({ success: false, error: 'Error al guardar el archivo.' });
    }
  } else {
    res.status(405).end();
  }
}
