import React from 'react';

export default function Vault() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">🔐 Your Saved Passwords</h2>
      <div className="grid gap-4">
        {/* Example card */}
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold">Gmail</h3>
          <p className="text-sm">Email: you@gmail.com</p>
          <p className="text-sm">Password: ••••••••</p>
        </div>
      </div>
    </div>
  );
}
