import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div style={{ position: 'fixed', inset: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '9999' }}>
      <TailSpin
        height={100}
        width={200}
        color="rgb(90, 88, 88)"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
