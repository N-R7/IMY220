import { useState } from 'react';

const CreatePost = ({ posts, setPosts }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState('');

  const handleSubmit = async (e) => {
    if (!caption.trim()) {
        alert('Caption is required');
        return;
    }
    e.preventDefault();

    const currentUser =
    JSON.parse(
        localStorage.getItem('currentUser')
    );

    const formData = new FormData();

    formData.append(
        'userId',
        currentUser?.id
    );

    formData.append(
        'username',
        currentUser?.username
    );

    formData.append(
        'caption',
        caption
    );

    formData.append(
        'hashtags',
        JSON.stringify(
            hashtags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '')
        )
    );

    if (image) {
        formData.append(
            'image',
            image
        );
    }

    try {
      const response = await fetch(
          'http://localhost:3000/api/posts',
          {
              method: 'POST',
              body: formData
          }
      );

      const data = await response.json();

      console.log("Post created:", data);

      const createdPost = {
          _id: data.insertedId,
          userId: currentUser?.id,
          username: currentUser?.username,
          caption,
          hashtags: hashtags
              .split(',')
              .map(tag => tag.trim())
              .filter(tag => tag !== ''),
          likes: 0,
          comments: [],
          timestamp: new Date(),
          image: data.image || null
      };

      setPosts([
          createdPost,
          ...posts
      ]);

      setCaption("");
      setImage(null);
      setHashtags("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card} >
      <h3>Create Post</h3>
      <div>
        <label>Image:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />
      </div>
      <div>
        <label>Caption:</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          rows="3"
        />
      </div>
      <div>
          <label>Hashtags:</label>

          <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="travel, beach, photography"
              style={styles.input}
          />
      </div>
      <button type="submit" style={styles.input}>Share Post</button>
    </form>
  );
};

const styles = {
    card: {
        backgroundColor: '#fffaf2',
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        marginBottom: '25px'
    },

    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        marginBottom: '15px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '10px',
        cursor: 'pointer'
    }
};

export default CreatePost;