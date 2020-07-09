import  React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import './App.css';

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
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
// test psuedo code
export default App;
