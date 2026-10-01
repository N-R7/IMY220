const express = require('express');
const cors = require('cors'); 
const { connectDB, getDB } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 

app.use(express.json());

app.post('/api/signup', async (req, res) => {
  try {
    const db = getDB();

    const {
      username,
      email,
      password
    } = req.body;

    const newUser = {
      username,
      email,
      password,
      bio: "",
      friends: []
    };

    const result = await db
      .collection('users')
      .insertOne(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      userId: result.insertedId
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const db = getDB();

    const { email, password } = req.body;

    const user = await db
      .collection('users')
      .findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
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

app.post('/api/posts', async (req, res) => {
    try {
        const db = getDB();

        const newPost = req.body;

        const result = await db
            .collection('posts')
            .insertOne(newPost);

        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const db = getDB();

        const result = await db
            .collection('posts')
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: {
                        caption: req.body.caption
                    }
                }
            );

        res.json({
            success: true,
            modifiedCount: result.modifiedCount
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        const db = getDB();

        const result = await db
            .collection('posts')
            .deleteOne({
                _id: new ObjectId(req.params.id)
            });

        res.status(200).json({
            success: true,
            deletedCount: result.deletedCount
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
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