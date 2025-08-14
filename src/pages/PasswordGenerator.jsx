import React, { useState } from 'react';

const PasswordGenerator = ({ onGenerate }) => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+=-[]{}|;:<>,.?/';
    
    let charset = lower;
    if (includeUpper) charset += upper;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    onGenerate(password);
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h2 className="font-bold mb-2">Generate Password</h2>
      <div className="flex gap-2 mb-2">
        <label>Length: 
          <input
            type="number"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label><input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} /> Uppercase</label>
        <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> Numbers</label>
        <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols</label>
      </div>
      <button onClick={generatePassword} className="bg-green-600 text-white px-4 py-1 rounded">Generate</button>
    </div>
  );
};

export default PasswordGenerator;
