import React from 'react';
import './index.css'; 

interface Props {
  isAtBottom: boolean
}

export const Footer = ({ isAtBottom }: Props) => {
  return (
    <footer className={`footer ${isAtBottom ? 'fixed' : ''}`}>
      <p> Developted by <a href="https://github.com/MatheusAlvesPereiraRosa">Matheus Alves</a> </p>
    </footer>    
  );
};
