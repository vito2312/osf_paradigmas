
// ESTADOS (HOOKS)
import React, { useState } from 'react';

//URL API
import { API_SERVER_URL } from './Url';

//ESTILOS
import styles from '../styles/TextEditor.module.css'

//COMPONENTES
import { renderLineNumbers } from './TextUtils';
import EditableTextArea from '@/components/TextAreas/EditableTextArea';
import ResponseTextArea from '@/components/TextAreas/ResponseTextArea';
import TranspilateTextArea from '@/components/TextAreas/TranspilateTextArea';
import Dialog from '@/components/Dialog';


const TextEditor = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [response, setResponse] = useState('');


  const [aboutData, setAboutData] = useState(null);
 
  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
      
    }
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);

    /*
    const words = newText.split(/\s+/);

    const processedWords = words
      .map((word) => word.trim())
      .filter((trimmedWord) => keywordsList.includes(trimmedWord));
  */
 
  };


  const handleSendToServer = async () => {
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
  };


  const handleAboutClick = async () => {
    try {
      const response = await fetch(`${API_SERVER_URL}/about`);
      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }
      const data = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error('Error al obtener datos de About:', error);
    }
  };

  const handleCloseDialog = () => {
    setAboutData(null);
  };



  return (
    <div>
      <div className={styles.customContainer}>
        {/* AREA EDITABLE (EA) */}
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <EditableTextArea value={inputText} onChange={handleInputChange} />

        {/* AREA DE SALIDA (TA) */}
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <TranspilateTextArea value={outputText} />

        {/* AREA DE RESPUESTA (RA) */}
        <ResponseTextArea value={response} />
      </div>


      <div className={styles.customButtons}>
        <button className={styles.button} onClick={handleClear}>Clear All</button>
        <button className={styles.buttonSend} onClick={handleSendToServer}>Send to Server</button>
        <button className={styles.buttonSend} onClick={handleSendToServer}>Guardar Script</button>
        <button className={styles.buttonSend} onClick={handleAboutClick}>ABOUT</button>
        {aboutData && <Dialog data={aboutData} onClose={handleCloseDialog} />}
      </div>

    </div>
  );
};



export default TextEditor;
