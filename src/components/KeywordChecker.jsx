
import { API_SERVER_URL } from './Url';
import React, { useState, useEffect } from 'react';

const KeywordChecker = ({ text }) => {
  const [isKeyword, setIsKeyword] = useState(false);

  useEffect(() => {
    const checkKeyword = async () => {
      try {
        const response = await fetch(`${API_SERVER_URL}/word?key=${text}`);
        
        if (!response.ok) {
          throw new Error('La solicitud no tuvo éxito.');
        }

        const data = await response.json();
        setIsKeyword(data.isKeyword);
      } catch (error) {
        console.error('Error checking if text is a keyword:', error);
      }
    };

    if (text) {
      checkKeyword();
    } else {
      // Si el texto está vacío, no es necesario hacer la solicitud
      setIsKeyword(false);
    }
  }, [text]);

  return null;
};

export default KeywordChecker;
