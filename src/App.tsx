import React from 'react';
import './App.css';
import Header from './components/Header';
import FileList from './components/FileList';
import FinRecordList from './components/FinRecordList';
import GlobalSettings from './components/GlobalSettings';
import "./i18n/config";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <GlobalSettings></GlobalSettings>
      <FinRecordList></FinRecordList>
    </div>
  );
}

export default App;
