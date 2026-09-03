import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/home" style={styles.link}>Capture</Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/profile/1" style={styles.link}>Profile</Link>
        <button style={styles.logoutBtn} onClick={() => console.log('Logout clicked')}>
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
    padding: '12px 30px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #ddd'
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    padding: '4px 8px'
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#333',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '16px'
  }
};

export default Navigation;