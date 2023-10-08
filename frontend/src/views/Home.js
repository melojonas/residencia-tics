import React, { useState } from 'react';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import '../css/Home.css';
import '../css/App.css';

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