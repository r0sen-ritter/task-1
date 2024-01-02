import { useState } from 'react'
import './App.css'
import Folder from './components/Folder'

function App() {
  const [folders, setFolders] = useState([]);

  const addFolder = (parentIndex) => {
    const name = window.prompt('Enter folder name');
    if (name) {
      const newFolders = [...folders];
      const newFolder = <Folder name={name} />;
      if (parentIndex != null) {
        newFolders[parentIndex].props.children.push(newFolder);
      } else {
        newFolders.push(newFolder);
      }
      setFolders(newFolders);
    }
  };

  return (
    <div>
      {folders.map((folder, index) => (
        <div key={index}>
          {folder}
          <button onClick={() => addFolder(index)}>Add Subfolder</button>
        </div>
      ))}
      <button onClick={() => addFolder(null)}>Add Folder</button>
    </div>
  );
}

export default App;