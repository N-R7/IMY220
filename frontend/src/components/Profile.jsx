const Profile = ({ user }) => {
  return (
    <div style={styles.profile}>
      <img src={user.profileImage}
           alt={user.username}
           style={styles.avatar}
      />
      <div style={styles.info}>
        <h2 style={styles.username}>{user.username}</h2>
        <p style={styles.bio}>{user.bio}</p>
        <div style={styles.stats}>
          <span>{user.postsCount} posts</span>
          <span>{user.followers} followers</span>
          <span>{user.following} following</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  profile: {
      display: 'flex',
      gap: '30px',
      padding: '30px',
      alignItems: 'center',
      backgroundColor: '#fffaf2',
      borderRadius: '20px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      marginBottom: '20px'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  info: {
    flex: 1
  },
  username: {
      fontSize: '28px',
      color: '#5c4033',
      marginBottom: '10px'
  },
  bio: {
      color: '#6d5d4f'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    color: '#666',
    fontSize: '14px'
  }
};

export default Profile;