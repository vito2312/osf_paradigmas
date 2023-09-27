import React from 'react';
import styles from '../../styles/TextEditor.module.css'
const ResponseTextArea = ({ value }) => {
  return (
    <textarea
      id={styles.TI}
      value={value}
      readOnly
      rows={10}
      cols={50}
    />
  );
};

export default ResponseTextArea;
