const express = require('express');
const cors = require('cors'); 
const { connectDB, getDB } = require('./db');

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

app.get('/api/users', async (req, res) => {
    try {
        const db = getDB();

        const users = await db
            .collection('users')
            .find({})
            .toArray();

        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const db = getDB();

        const posts = await db
            .collection('posts')
            .find({})
            .toArray();

        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/albums', async (req, res) => {
    try {
        const db = getDB();

        const albums = await db
            .collection('albums')
            .find({})
            .toArray();

        res.json(albums);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });