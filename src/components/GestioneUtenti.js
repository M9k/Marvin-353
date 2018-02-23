import React from 'react';
import Button from './buttons/Button';
import Header from './global/Header';
import web3 from 'web3';

const GestioneUtenti = () => {
  document.title = 'Marvin - Gestione Utenti';
  return (
    <div className="GestioneUtenti">
      <Header />
      <div className="page-content">
        <Button link="/">Ottieni il numero di studenti</Button><br />
      </div>
    </div>
  );
};

export default GestioneUtenti;

