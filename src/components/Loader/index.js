import React, {useState, useEffect} from 'react';
import {FadeLoader} from 'react-spinners';
import './styles.css';

export default function Loader() {
  const [isLoading] = useState(true);
  const [classes, setClasses] = useState('');

  useEffect(() => {
    setClasses(
      isLoading ? 'loading-overlay-content' : 'loading-overlay-content hide'
    );
  }, [isLoading]);

  return (
    <>
      <div className={classes}>
        <div className='loading-wrapper'>
          <FadeLoader size={150} color={'#FFF'} loading={true} />
        </div>
      </div>
    </>
  );
}
