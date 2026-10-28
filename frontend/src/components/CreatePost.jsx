import { useState } from 'react';

const CreatePost = ({ posts, setPosts }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser =
    JSON.parse(
        localStorage.getItem('currentUser')
    );

    const newPost = {
        username: currentUser?.username,
        image: image ? image.name : 'placeholder.jpg',
        caption,
        hashtags: hashtags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== ''),
        likes: 0,
        comments: []
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPost)
        }
      );

      const data = await response.json();

      console.log("Post created:", data);

      setPosts([
          ...posts,
          {
              ...newPost,
              _id: data.insertedId
          }
      ]);

      setCaption("");
      setImage(null);
      setHashtags("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Post</h3>
      <div>
        <label>Image:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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
          />
      </div>
      <button type="submit">Share Post</button>
    </form>
  );
};

export default CreatePost;