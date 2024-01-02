import React from 'react'
import { useState } from 'react'

function Folder({ name, children }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleClick = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <div onClick={handleClick}>
          {name} {isOpen ? '-' : '+'}
        </div>
        {isOpen && children}
      </div>
    );
  }

export default Folder