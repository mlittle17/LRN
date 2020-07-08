import  React, { useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';

function App() {

  useEffect(() => {
    axios.post('/test')
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
