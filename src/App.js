import React, { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import AuthForm from './components/AuthForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const dummyProfiles = [
  // Politicians
  { id: 1, name: 'Imran Khan', bio: 'Former Prime Minister & Cricketer', followed: false, image: 'ik.webp', category: 'Politician' },
  { id: 2, name: 'Dr Arif Alvi', bio: 'Former President of Pakistan', followed: false, image: 'arif.webp', category: 'Politician' },
  { id: 3, name: 'Sheikh Rasheed', bio: 'Political Leader & Former Minister', followed: false, image: 'shk.jpeg', category: 'Politician' },
  { id: 4, name: 'Murad Saeed', bio: 'Young Politician & Former MNA', followed: false, image: 'muraad.webp', category: 'Politician' },

  // Military
  { id: 5, name: 'Zaheer Ahmad Babar Sidhu', bio: 'Air Chief Marshal - PAF', followed: false, image: 'sadu.webp', category: 'Military' },
  { id: 6, name: 'Naveed Ashraf', bio: 'Admiral Navy Chief', followed: false, image: 'navy.webp', category: 'Military' },
  { id: 7, name: 'Asif Ghafoor', bio: 'Lt Gen & Former ISPR DG', followed: false, image: 'asif.webp', category: 'Military' },
  { id: 8, name: 'Asim Munir', bio: 'Field Marshal Army', followed: false, image: 'doggy.webp', category: 'Military' },

  // Actors
  { id: 9, name: 'Ahsan Khan', bio: 'TV & Film Actor', followed: false, image: 'ahsan.webp', category: 'Actor' },
  { id: 10, name: 'Fahad Mustafa', bio: 'Actor & TV Host', followed: false, image: 'fahad.webp', category: 'Actor' },
  { id: 11, name: 'Fawad Chaudhary', bio: 'TV Actor', followed: false, image: 'fawad.webp', category: 'Actor' },
    { id: 12, name: 'Bilal Abbas Khan', bio: 'Actor', followed: false, image: 'bilal.jpeg', category: 'Actor' },

  // Cricketers
  { id: 13, name: 'Babar Azam', bio: 'Pakistani Captain & Batsman', followed: true, image: 'bab.webp', category: 'Cricketer' },
  { id: 14, name: 'Shaheen Afridi', bio: 'Pakistani Fast Bowler', followed: false, image: 'sh.webp', category: 'Cricketer' },
  { id: 15, name: 'Mohammad Rizwan', bio: 'Wicketkeeper & Batsman', followed: false, image: 'rz.webp', category: 'Cricketer' },
  { id: 16, name: 'David Warner', bio: 'Australian Opener', followed: false, image: 'dav.webp', category: 'Cricketer' },
  { id: 17, name: 'Kane Williamson', bio: 'New Zealand Captain', followed: false, image: 'kane.jpeg', category: 'Cricketer' },
  { id: 18, name: 'Chris Gayle', bio: 'West Indies Power Hitter', followed: false, image: 'cris.jpeg', category: 'Cricketer' }
];


function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return !!localStorage.getItem('sessionUser');
  });
  const [sessionUser, setSessionUser] = useState(() => {
    return JSON.parse(localStorage.getItem('sessionUser')) || null;
  });

  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [profiles, setProfiles] = useState(dummyProfiles);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleFollow = (id) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, followed: !p.followed } : p))
    );
  };

  const followedCount = profiles.filter(p => p.followed).length;

  const handleLogin = (username) => {
    localStorage.setItem('sessionUser', JSON.stringify({ username }));
    setSessionUser({ username });
    setAuthenticated(true);
  };

  if (!authenticated) {
    return (
      <div
        style={{
          position: 'relative',
          backgroundImage: "url('/images/bk.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <h2
          style={{
            color: '#6f451dff',
            textAlign: 'center',
            marginBottom: '41px',
            fontSize: '4rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Welcome to Ghulam Qadir Profile Card!!
        </h2>
        <div
          className="card p-4 shadow-lg"
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            backgroundColor: 'rgba(168, 120, 30, 0.95)',
          }}
        >
          <AuthForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1f1f1f' }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <button
            className="btn btn-outline-light me-3"
            onClick={() => setShowSidebar(true)}
            title="Open Sidebar"
          >
            ☰
          </button>
          <div className="d-flex align-items-center gap-3">
            {sessionUser && (
              <span className="text-white fw-semibold">
                👋 Welcome, <span style={{ color: '#ffd700' }}>{sessionUser.username}</span>
              </span>
            )}
            <button
              className="btn btn-outline-light"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Theme"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem('sessionUser');
                setAuthenticated(false);
                setSessionUser(null);
              }}
              title="Logout"
            >
              🔒 Logout
            </button>
          </div>
        </div>
      </nav>

      {showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}></div>}
      <div className={`sidebar-drawer ${showSidebar ? 'open' : ''}`}>
        <h5>Followers Summary</h5>
        <p>Total Profiles: {profiles.length}</p>
        <p>Followed: {followedCount}</p>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {profiles.filter(p => p.followed).map(profile => (
            <img
              key={profile.id}
              src={`/images/${profile.image}`}
              alt={profile.name}
              title={profile.name}
              className="rounded-circle"
              style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid white' }}
            />
          ))}
        </div>
        <button className="btn btn-sm btn-outline-light mt-4" onClick={() => setShowSidebar(false)}>Close</button>
      </div>

      {/* Grouped Content */}
      <div className="container mt-5">
        {['Cricketer', 'Politician', 'Military', 'Actor'].map((category) => {
          const filteredProfiles = profiles.filter(p => p.category === category);
          if (filteredProfiles.length === 0) return null;

          return (
            <div key={category} className="mb-5">
              <h3 className="mb-4 text-center category-heading">{category}s</h3>
              <div className="row justify-content-center">
                {filteredProfiles.map(profile => (
                  <ProfileCard key={profile.id} profile={profile} toggleFollow={toggleFollow} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;