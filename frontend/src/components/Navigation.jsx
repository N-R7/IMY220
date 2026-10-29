import { Link } from 'react-router-dom';

const Navigation = () => {
  const currentUser = JSON.parse(
      localStorage.getItem('currentUser')
  );

  const isAdmin =
    currentUser?.role === 'admin';

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/home" style={styles.link}>Capture</Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link
            to={`/profile/${currentUser?.id}`}
            style={styles.link}
        >
            Profile
        </Link>
        {isAdmin && (
            <Link
                to="/admin"
                style={styles.link}
            >
                Admin
            </Link>
        )}
        <button
            style={styles.logoutBtn}
            onClick={() => {
                localStorage.removeItem(
                    'currentUser'
                );

                localStorage.removeItem(
                    'currentUserData'
                );

                window.location.href = '/';
            }}
        >
            Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '18px 40px',
        backgroundColor: '#ede0d4',
        borderBottom: '2px solid #d6c4b2',
        boxSizing: 'border-box'
    },

    logo: {
        fontSize: '30px',
        fontWeight: 'bold'
    },

    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
    },

    link: {
        color: '#5c4033',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '18px'
    },

    logoutBtn: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px',
        cursor: 'pointer'
    }
};

export default Navigation;