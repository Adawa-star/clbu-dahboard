import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      onClose(); // Close modal on success
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fdfaf5', padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
        
        <h2 style={{ marginTop: 0, color: '#3d2e26' }}>Moderator Login</h2>
        <p style={{ fontSize: '0.8rem', color: '#8a7a6a', marginBottom: '15px' }}>Log in as a Moderator to manage PAstU articles.</p>
        
        {errorMsg && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errorMsg}</p>}

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '10px', background: '#c17c4a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', background: 'transparent', color: '#b8543d', border: '1px solid #b8543d', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}