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
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#fffaf2',
        borderRadius: '14px',
        marginBottom: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
    },

    avatarPlaceholder: {
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        backgroundColor: '#d6c4b2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px'
    },

    username: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#5c4033',
        fontSize: '16px'
    }
};

export default ProfilePreview;