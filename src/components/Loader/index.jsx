import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './styles.module.scss';

function Loader({ isLoading, children }) {
  return (
    <>
      {isLoading ? (
        <div className={styles.wrapper}>
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Loader;
