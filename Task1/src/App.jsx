import React, { useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

const App = () => {
  const [folders, setFolders] = useState([]);

  const findFolderInState = (folders, folderToFind) => {
    for (let folder of folders) {
      if (folder.name === folderToFind.name) {
        return folder;
      } else if (folder.children.length > 0) {
        const foundFolder = findFolderInState(folder.children, folderToFind);
        if (foundFolder) {
          return foundFolder;
        }
      }
    }
    return null;
  };

  const addFolder = (parentFolder = null) => {
    const name = prompt('Enter new folders name');
    if (name) {
      const newFolder = { name, children: [], isOpen: false };
      if (parentFolder) {
        const newFolders = JSON.parse(JSON.stringify(folders));
        const parentInState = findFolderInState(newFolders, parentFolder);
        if (parentInState) {
          parentInState.children.push(newFolder);
          setFolders(newFolders);
        }
      } else {
        setFolders(prevFolders => [...prevFolders, newFolder]);
      }
    }
  };

  // Function to toggle a folder's open/close state
  const toggleFolder = (folder) => {
    const newFolders = JSON.parse(JSON.stringify(folders)); 
    const folderInState = findFolderInState(newFolders, folder);
    folderInState.isOpen = !folderInState.isOpen;
    setFolders(newFolders);
  };

  //rendering folder
  const Folder = ({ folder }) => {
    const handleClick = () => {
      toggleFolder(folder);
    };

    return (
      <div style={{margin:'2rem'}}>
        <div onClick={handleClick}>
          {folder.name} {folder.isOpen ? <MdArrowDropDown /> : <IoMdArrowDropright />}
        </div>
        {folder.isOpen && (
          <>
            {folder.children.map((child, index) => (
              <div style={{ paddingLeft: "3rem" }} key={index}>
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
    <div style={{margin:5}}>
      {folders.map((folder, index) => (
        <Folder folder={folder} key={index} />
      ))}
      <button onClick={() => addFolder()}>Add Folder to Root</button>
    </div>
  );
};

export default App;