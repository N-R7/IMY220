const Profile = ({ user }) => {
  return (
    <div style={styles.profile}>
      <div style={styles.avatarPlaceholder}>👤</div>
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
    padding: '20px',
    alignItems: 'center'
  },
  avatarPlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    color: '#666'
  },
  info: {
    flex: 1
  },
  username: {
    margin: 0,
    fontSize: '24px'
  },
  bio: {
    color: '#666',
    margin: '4px 0'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    color: '#666',
    fontSize: '14px'
  }
};

export default Profile;