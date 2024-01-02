import React from 'react'

const Folder = ({ folder }) => {
    return (
      <div style={{
        display: 'inline-block',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '10px',
        padding: '10px',
        margin: '5px',
        border: '1px solid black'
      }}>
        {folder.name}
      </div>
    );
  };

export default Folder