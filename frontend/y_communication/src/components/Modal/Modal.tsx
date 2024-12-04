import React, { FC } from 'react';
import './Modal.css';

interface Term {
  title: string;
  description: string;
  required: boolean;
  checked: boolean;
}

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  terms: Term[];
  onTermChange: (index: number) => void;
}

const Modal: FC<ModalProps> = ({ showModal, onClose, terms, onTermChange }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Termos de Uso</h2>
        {terms.map((term, index) => (
          <div key={index} className="term-item">
            <h3>{term.title}</h3>
            <p>{term.description}</p>
            {term.required ? (
              <p className="term-required">Termo Obrigatório</p>
            ) : (
              <div className="term-footer">
                <label>
                  <input 
                    type="checkbox" 
                    checked={term.checked} 
                    onChange={() => onTermChange(index)} 
                  /> Aceito
                </label>
              </div>
            )}
          </div>
        ))}
        <button className="close-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
