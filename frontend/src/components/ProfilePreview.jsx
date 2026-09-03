import { Link } from 'react-router-dom';

const ProfilePreview = ({ user }) => {
  return (
    <div style={styles.card}>
      <div style={styles.avatarPlaceholder}>👤</div>
      <Link to={`/profile/${user.id}`} style={styles.username}>
        {user.username}
      </Link>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    gap: '12px',
    borderBottom: '1px solid #eee'
  },
  avatarPlaceholder: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: '#666'
  },
  username: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#333'
  }
};

export default ProfilePreview;