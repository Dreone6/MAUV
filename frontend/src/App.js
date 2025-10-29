import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
