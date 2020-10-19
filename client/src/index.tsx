import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import DataTable from "./components/datatable";

ReactDOM.render(
  <React.StrictMode>
      <div style={{ display: "flex", justifyContent: "center", width: '60%'}}>
          <DataTable/>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
