import React, { useState } from 'react';
import '../css/App.css';
import '../css/Home.css';
import Header from './partials/Header.js';
import Sidebar from './partials/Sidebar.js';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="main">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="content">
          <h1>Bem-vindo à Página Principal</h1>
          <p>Aqui você encontrará informações e recursos importantes.</p>
        </main>
      </div>
    </div>
  );
}

export default Home;