import React, { useEffect , useState } from 'react';
import styles from '../../styles/ErrorAlert.module.css'; // Importa los estilos CSS módulo

const ErrorAlert = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      if (message) {
        setIsVisible(true);
        // Establece un temporizador para ocultar el mensaje después de 2 segundos
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose(); // Cierra la alerta después de ocultarla
        }, 3000);
  
        // Limpia el temporizador cuando el componente se desmonta
        return () => {
          clearTimeout(timer);
        };
      }
    }, [message, onClose]); // Agrega onClose como una dependencia
  
    return (
      <div className={`${styles.errorAlert} ${isVisible ? styles.active : ''}`}>
        <p>{message}</p>
      </div>
    );
  };
  
  export default ErrorAlert;