import React from 'react';
import styles from '../../styles/TextEditor.module.css'
const EditableTextArea = ({ value, onChange }) => {
  return (
    <textarea
      id={styles.TI}
      value={value}
      onChange={onChange}
      rows={10}
      cols={50}
      placeholder="Escribe tu código aquí..."
    />
  );
};

export default EditableTextArea;
