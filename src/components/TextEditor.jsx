import React, { useState, useCallback } from 'react';
import { API_SERVER_URL } from './Url';
import KeywordChecker from './KeywordChecker';
import styles from '../styles/TextEditor.module.css'


const TextEditor = ({ keywordsList }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  //LIMPIAR LA PANTALLA
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
    <div>
      <div className={styles.customContainer}>
          <textarea
          id={styles.TI}
          className={`${styles.customTextarea}`}
          value={inputText}
          onChange={handleInputChange}
          placeholder=""
        />
          <textarea 
          id={styles.TO} 
          className={`${styles.customTextarea}`} 
          readOnly 
          value={outputText}
        />
        <KeywordChecker text={inputText} />
      </div>

        <div className={styles.customButtons}>
           <button className={styles.button} onClick={handleClear} >Clear All</button>
           <button className={styles.buttonSend} onClick={handleSendToServer}>Send to Server</button>
        </div>
    </div>
 
  );
};



export default TextEditor;
