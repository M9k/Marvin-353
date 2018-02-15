import React from 'react';
import Button from './buttons/Button';
import ButtonPrice from './buttons/ButtonPrice';
import ButtonHelp from './buttons/ButtonHelp';
import Header from './global/Header';

// Home page component
// TODO: Cambiare la home in base se l'utente è già autenticato nel sistema
const Home = () => (
  <div className="page-home">
    <Header>
      <ButtonPrice />
      <ButtonHelp />
    </Header>
    <Button link="/login">Login</Button><br />
    <Button link="/register">Register</Button><br />
    <h2>Versione di Web3: {web3.version.api}</h2><br />
  </div>
);

export default Home;
