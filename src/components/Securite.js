import  { useState } from 'react';
//import DOMPurify from 'dompurify';

export default function Securite() {
  const [inputValue, setInputValue] = useState('');
  const blog = `
    <h3>titre h3 </h3>
    <p>un code de p <b>bold</b> elements as well as <i>italic</i> elements here! <p>
  `;

  const handleChange = (event) => {

    setInputValue(event.target.value);

  };
  return (
    <div>
      <h2>Securité </h2>
      <label htmlFor="input">Saisissez du texte:</label>
      <input
        type="text"
        id="input"
        value={inputValue}
            onChange={handleChange}
      />
      <h2>Contenu HTML en fonction de l'input:</h2>
      <p dangerouslySetInnerHTML={{ __html:   inputValue }}></p>
    </div>
  );
}
