export default function handler(req, res) {
    if (req.method === 'POST') {
      const timestampedText = `Echo from server: at ${new Date().toISOString()}: \n ${req.body.text}`;
      console.log(timestampedText);
      res.status(200).json({ result: timestampedText });
    } else {
      res.status(405).end(); 
    }
  }
  