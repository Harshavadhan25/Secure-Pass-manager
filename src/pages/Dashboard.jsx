import React, { useEffect, useState } from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn';

const Dashboard = () => {
  const [vaults, setVaults] = useState([]);
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const API = import.meta.env.VITE_API_BASE_URL;

  const fetchVaults = async () => {
    try {
      const res = await axios.get(`${API}/api/vault`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVaults(res.data);
    } catch (err) {
      console.error('Error loading vaults:', err);
      setError('Failed to load vaults');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/vault`,
        { site, username, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSite('');
      setUsername('');
      setPassword('');
      setStrength(null);
      fetchVaults();
    } catch (err) {
      console.error('Error saving vault:', err);
      setError('Error saving vault');
    }
  };

  useEffect(() => {
    fetchVaults();
  }, []);

  useEffect(() => {
    if (password) {
      setStrength(zxcvbn(password).score);
    } else {
      setStrength(null);
    }
  }, [password]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Vault</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        {strength !== null && (
          <div className="mb-2">Password Strength: {['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength]}</div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Vault Entry
        </button>
      </form>

      {vaults.length === 0 ? (
        <p>No vault entries yet.</p>
      ) : (
        <ul className="space-y-2">
          {vaults.map((v) => (
            <li key={v._id} className="p-3 border rounded shadow">
              <strong>{v.site}</strong> — {v.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;