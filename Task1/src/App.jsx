import React, { useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

const App = () => {
  const [folders, setFolders] = useState([]);

  const addFolder = (parentFolder = null) => {
    const name = prompt('Enter folder name');
    if (name) {
      const newFolder = { name, children: [], isOpen: false };
      if (parentFolder) {
        const newFolders = JSON.parse(JSON.stringify(folders)); // Deep copy
        const parentInState = newFolders.find(folder => folder.name === parentFolder.name);
        parentInState.children.push(newFolder);
        setFolders(newFolders);
      } else {
        setFolders(prevFolders => [...prevFolders, newFolder]);
      }
    }
  };

  const toggleFolder = (folder) => {
    const newFolders = JSON.parse(JSON.stringify(folders)); // Deep copy
    const folderInState = newFolders.find(f => f.name === folder.name);
    folderInState.isOpen = !folderInState.isOpen;
    setFolders(newFolders);
  };

  const Folder = ({ folder }) => {
    const handleClick = () => {
      toggleFolder(folder);
    };

    return (
      <div>
        <div onClick={handleClick}>
          {folder.name} {folder.isOpen ? <MdArrowDropDown /> : <IoMdArrowDropright />}
        </div>
        {folder.isOpen && (
          <>
            {folder.children.map((child, index) => (
              <div style={{ paddingLeft: "1.5rem" }} key={index}>
                <Folder folder={child} />
              </div>
            ))}
            <button onClick={() => addFolder(folder)}>Add Subfolder</button>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      {folders.map((folder, index) => (
        <Folder folder={folder} key={index} />
      ))}
      <button onClick={() => addFolder()}>Add Folder</button>
    </div>
  );
};

export default App;