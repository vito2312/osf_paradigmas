const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');


const app = express();
const port = 3001; // Change this port as needed

app.use(cors());

app.use(bodyParser.json());

// Serve static content (e.g., React build)
app.use(express.static('build'));


function loadKeywordsList() {
  const keywordsFilePath = path.join(__dirname, 'keywords.json');
  try {
    const keywordsData = fs.readFileSync(keywordsFilePath, 'utf8');
    return JSON.parse(keywordsData);
  } catch (error) {
    console.error('Error loading keywords list:', error);
    return [];
  }
}
const keywordsList = loadKeywordsList();

// Process endpoint
app.post('/process', (req, res) => {
  // Process the input and echo it with a timestamp
  const timestampedText = `Echo from server: at ${new Date().toISOString()}: ${req.body.text}`;
  console.log(timestampedText)
  res.json({ result: timestampedText });
});

// About endpoint (for future implementation)
app.get('/about', (req, res) => {
  res.send('About page (to be implemented)');
});

// Load the keywords list from a JSON file


app.get('/keywords', (req, res) => {
  res.json({ keywords: keywordsList });
});


app.get('/word', (req, res) => {
  const { key } = req.query;
  const isKeyword = keywordsList.includes(key.trim());
  const data = { text: key, isKeyword };
  //console.log(data)
  res.json(data);
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
