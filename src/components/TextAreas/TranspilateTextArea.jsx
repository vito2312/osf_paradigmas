import React from 'react';
import styles from '../../styles/TextEditor.module.css'
const TranspilateTextArea = ({ value }) => {
  return (
    <textarea
      id={styles.TO}
      value={value}
      readOnly
      rows={10}
      cols={50}
    />
  );
};

export default TranspilateTextArea;
