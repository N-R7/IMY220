import { useState } from 'react';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);  

  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); 
    
    try {  
      // BACKEND CONNECTION
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.json();
      console.log('Server response:', data);
      
      if (data.success) {

          localStorage.setItem(
              'currentUser',
              JSON.stringify({
                  username,
                  email
              })
          );

          alert(data.message);

          setErrors({});
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');

          window.location.href = '/home';
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Sign Up</h2>
      
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>
      
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
      </div>
      
      <button type="submit" disabled={loading} style={styles.button}>  {}
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

const styles = {
    form: {
        backgroundColor: '#fffaf2',
        padding: '25px',
        borderRadius: '18px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        minWidth: '350px'
    },

    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2',
        marginBottom: '10px'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '10px',
        width: '100%'
    }
};

export default SignupForm;