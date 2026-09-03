// backend/server.js
const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 

app.use(express.json());

// Stubbed Sign Up endpoint
app.post('/api/signup', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  
  console.log('Signup attempt:', { username, email, password, confirmPassword });
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    user: {
      id: 1,
      username: username,
      email: email
    }
  });
});

// Stubbed Sign In endpoint
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, password });
  
  res.status(200).json({
    success: true,
    message: 'Login successful!',
    user: {
      id: 1,
      email: email,
      username: 'sun_purple'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});