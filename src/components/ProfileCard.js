import React from 'react';

const ProfileCard = ({ profile, toggleFollow }) => {
  const isFollowed = profile.followed;

  // ✅ Role-based tag colors (bio)
  const roleColors = {
  // Actor Category
  'Actor': '#0d6efd',
  'Actor & TV Host': '#2488a3ff',
  'TV & Film Actor': '#4682b4',
  'TV Actor': '#5c0b88ff', // for Fawad Chaudhary

  // Politician Category
  'Politician': '#78e01eff',
  'Former Prime Minister & Cricketer': '#1c7104ff',
  'Former President of Pakistan': '#90c51fff',
  'Political Leader & Former Minister': '#23c889ff',
  'Young Politician & Former MNA': '#b1a51aff',

  // Military Category
  'Military': '#6c757d',
  'Field Marshal Army': '#2c440aff',
  'Admiral Navy Chief': '#b1d6d5ff',
  'Lt Gen & Former ISPR DG': '#42671cff',
  'Air Chief Marshal - PAF': '#122d7fff',

  // Cricketer Category
  'Cricketer': '#198754',
  'Pakistani Captain & Batsman': '#198554',
  'Pakistani Fast Bowler': '#198754',
  'Wicketkeeper & Batsman': '#197854',
  'Australian Opener': '#c3ee00',
  'New Zealand Captain': '#0c474a',
  'West Indies Power Hitter': '#983b09'
};


  // ✅ Category background colors (category)
  const cardBackgrounds = {
    'Actor': '#e8f0ff',
    'UI/UX Designer': '#f3e8ff',
    'React Enthusiast': '#e0fdf4',
    'Politician': '#fff4e5',
    'Military': '#e6f4ea',
    'Cricketer': '#e0f7fc',
  };

  return (
    <div className="col-md-3 mb-3">
      <div
        className={`card profile-card h-100 text-center border-0 shadow-sm ${isFollowed ? 'followed' : ''}`}
        style={{
          backgroundColor: cardBackgrounds[profile.category] || '#f9f9f9', // ✅ fixed here
          borderRadius: '16px',
          transition: 'transform 0.2s ease',
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center position-relative">
          {/* ✅ Followed Badge */}
          {isFollowed && (
            <span
              className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success"
              style={{ fontSize: '0.7rem', marginTop: '10px', marginRight: '10px' }}
            >
              ✔️ Followed
            </span>
          )}

          {/* ✅ Profile Image */}
          <img
            src={`/images/${profile.image}`}
            alt={profile.name}
            className="rounded-circle shadow profile-img"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              marginBottom: '15px',
              border: '4px solid #fff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />

          {/* ✅ Name */}
          <h5 className="card-title fw-bold mb-1" style={{ color: '#333' }}>
            {profile.name}
          </h5>

          {/* ✅ Bio Tag */}
          <p
            className="mb-3 px-3 py-1 rounded-pill"
            style={{
              backgroundColor: roleColors[profile.bio] || '#adb5bd',
              color: '#fff',
              fontSize: '0.85rem',
            }}
          >
            {profile.bio}
          </p>

          {/* ✅ Follow Button */}
          <button
            className={`btn ${
              isFollowed ? 'btn-outline-danger' : 'btn-outline-success pulse-btn'
            } px-4`}
            onClick={() => toggleFollow(profile.id)}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
