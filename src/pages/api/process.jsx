export default function handler(req, res) {
  if (req.method === 'POST') {
    const timestampedText = req.body.text;
    const timestamp = new Date().toISOString();

    console.log(timestampedText);

   
    const responseJson = {
      message: `Echo from server: at ${timestamp}`,
      result: timestampedText
    };

    res.status(200).json(responseJson);
  } else {
    res.status(405).end(); 
  }
}

 