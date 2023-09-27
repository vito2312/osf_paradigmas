// Importa las bibliotecas necesarias para trabajar con el sistema de archivos
const fs = require('fs');
const path = require('path');

// Define la ruta al directorio donde se almacenan los scripts
const scriptsDirectory = path.join(process.cwd(), '/src/scripts');

// Controlador para cargar un script por ID
export default function handler(req, res) {
  if (req.method !== 'POST') {
    // Si la solicitud no es de tipo POST, responde con un código de estado 405 (Método no permitido)
    res.status(405).end();
    return;
  }

  const { id } = req.query;

  // Construye la ruta al script utilizando el ID proporcionado
  const scriptFilePath = path.join(scriptsDirectory, `${id}.txt`);

  try {
    // Lee el contenido del script desde el archivo en el sistema de archivos
    const scriptContent = fs.readFileSync(scriptFilePath, 'utf8');

    // Devuelve el contenido del script como respuesta
    res.status(200).send(scriptContent);
  } catch (error) {
    console.error('Error al cargar el script:', error);
    res.status(500).json({ error: 'Error al cargar el script' });
  }
}
