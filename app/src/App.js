import  React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  useEffect(() => {
    axios.get('/')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  })

  return (
    <div className="App">
      <div>LRN</div>
    </div>
  );
}
// test psuedo code
export default App;
