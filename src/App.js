import React, { useEffect, useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const App = () => {
  const [deviceId, setDeviceId] = useState('');
  const [resultText, setResultText] = useState('NOT FOUND');
  let codeReader = useRef();
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    codeReader.current.listVideoInputDevices((vidInDe) => {
      console.log(vidInDe);
      setDeviceId(vidInDe[0].deviceId);
    });
  }, []);

  useEffect(() => {
    codeReader.current.reset();
  }, [resultText]);

  const onRead = () => {
    codeReader.current.decodeFromVideoDevice(deviceId, 'video', (result) => {
      if (result) {
        setResultText(result.text);
      }
    });
    console.log(`Started continous decode from camera with id ${deviceId}`);
  };

  const onStop = () => {
    codeReader.current.reset();
  };

  return (
    <div>
      <video
        id='video'
        width='300'
        height='200'
        style={{ border: 'solid black 1px' }}
      ></video>
      <div className='result'>{resultText}</div>
      <button onClick={onRead}>CLICK</button>
      <button onClick={onStop}>CLICK</button>
    </div>
  );
};

export default App;
