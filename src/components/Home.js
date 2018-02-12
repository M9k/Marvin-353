import React from 'react';
import Button from './buttons/Button';
import ButtonPrice from './buttons/ButtonPrice';
import Header from './global/Header';

// Home page component
// SE ESISTE GIà UN LOGIN ATTIVO NEL SITO E SI RICHIEDE LA HOME SI DEVE ESSERE PORTATI ALLA
// HOME CORRETTA -> login nello stato
const Home = () => (
  <div className="page-home">
    <Header>
      <ButtonPrice />
    </Header>
    <Button link="/login">Login</Button><br />
    <Button link="/register">Register</Button><br />
  </div>
);

export default Home;
