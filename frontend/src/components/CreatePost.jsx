import { useState } from 'react';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: "nina",
      image: image ? image.name : "placeholder.jpg",
      caption,
      hashtags: [],
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

      setCaption("");
      setImage(null);

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
      <button type="submit">Share Post</button>
    </form>
  );
};

export default CreatePost;