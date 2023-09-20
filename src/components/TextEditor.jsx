import React, { useState, useCallback } from 'react';
import { API_SERVER_URL } from './Url';
import KeywordChecker from './KeywordChecker';





const TextEditor = ({ keywordsList }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
    }
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    const words = newText.split(/\s+/);

    const processedWords = words
      .map((word) => word.trim())
      .filter((trimmedWord) => keywordsList.includes(trimmedWord));

    const processedText = processedWords.join(' ');

    setInputText(newText);
    setOutputText(processedText);
  };

  const handleSendToServer = useCallback(async () => {
    try {
      const response = await fetch(`${API_SERVER_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }

      const data = await response.json();
      setOutputText(data.result);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  }, [inputText]);

  return (
    <div className="custom-container">
      <textarea
        id="TI"
        className="custom-textarea"
        value={inputText}
        onChange={handleInputChange}
        placeholder=""
      />
      <textarea id="TO" className="custom-textarea bg-black text-white" readOnly value={outputText} />
      <div className="custom-buttons">
        <button onClick={handleClear}>Clear All</button>
        <button onClick={handleSendToServer}>Send to Server</button>
      </div>
      <KeywordChecker text={inputText} />
    </div>
  );
};

export default TextEditor;
