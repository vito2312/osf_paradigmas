
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
  const [fileName, setFileName] = useState(`Untitlde-1`);
  //about
  const [aboutData, setAboutData] = useState(null);
 
  //textoCargado
  const [loadedScript, setLoadedScript] = useState('');



  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
      setLoadedScript(''); 
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
  
      const responseData = await response.json();
      const timestampedText = responseData.result;
  
      // Formatear la respuesta JSON como una cadena legible
      const formattedResponse = JSON.stringify(responseData, null, 2);
  
      setOutputText(`${formattedResponse}`);
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


  const handleLoadScript = async (scriptId) => {
    try {
      const response = await fetch(`${API_SERVER_URL}/script?id=${scriptId}`, { method: 'GET' });
  
      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }
  
      const scriptContent = await response.text();
  
      setInputText(scriptContent); // Establece el contenido del script en el área editable (EA)
  
    } catch (error) {
      console.error('Error al cargar el script:', error);
    }
  };
  
  

  const handleNewArchive = () =>{
    setFileName('Untitlde-1');
    setInputText('');
  };

  const handleSaveScript = async () => {



    const partes = fileName.split(".");
    const name = partes[0];
    const extension = partes[partes.length - 1];

    try {
      const response = await fetch(`${API_SERVER_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Cambia el tipo de contenido a JSON
        },
        body: JSON.stringify({
          extension,
          fileName : name, // Agrega el nombre personalizado al cuerpo de la solicitud
          scriptContent: inputText, // Agrega el contenido del script
        }),
      });
  
      if (response.ok) {
        // El archivo se guardó con éxito
        console.log('Archivo guardado exitosamente.');
      } else {
        console.error('Error al guardar el archivo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }


  };
  

  return (
    <div>
        <div className={styles.customButtons}>
        <button className={styles.button} onClick={handleClear}>Clear All</button>
        <button className={styles.buttonSend} onClick={handleSendToServer}>Send to Server</button>
        <button className={styles.buttonSend} onClick={handleSaveScript}>Guardar Script</button>
        <button className={styles.buttonSend} onClick={() => handleLoadScript(fileName)}>Recuperar Script</button>
        <button className={styles.buttonSend} onClick={handleAboutClick}>ABOUT</button>
        {aboutData && <Dialog data={aboutData} onClose={handleCloseDialog} />}
      </div>
      
      
      <input
        type="text"
        placeholder="Nombre del archivo"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <button className={styles.buttonSend} onClick={handleNewArchive}>Nuevo Archivo</button>

      <div className={styles.customContainer}>

        {/* AREA EDITABLE (EA) */}
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <EditableTextArea value={ loadedScript || inputText} onChange={handleInputChange} />

        {/* AREA DE SALIDA (TA) */}
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <TranspilateTextArea value={outputText} />

      </div>
      
      <div className={styles.compile_area}>
         {/* AREA DE RESPUESTA (RA) */}
         <ResponseTextArea value={response} />
      </div>

    </div>
  );
};



export default TextEditor;
