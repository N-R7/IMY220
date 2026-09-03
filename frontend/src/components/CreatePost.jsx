import { useState } from 'react';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post created:', { caption, image });
    setCaption('');
    setImage(null);
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