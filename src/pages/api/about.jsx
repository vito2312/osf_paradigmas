export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).send('About page (to be implemented)');
    } else {
      res.status(405).end(); // Método no permitido
    }
  }