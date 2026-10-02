import { useState } from 'react';

const EditPost = ({ post }) => {
  const [caption, setCaption] = useState(post?.caption || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${post._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            caption
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert('Post updated successfully!');
        window.location.reload();
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Post</h4>

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button type="submit">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;