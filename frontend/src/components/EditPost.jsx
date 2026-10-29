import { useState } from 'react';

const EditPost = ({ post }) => {
  const [caption, setCaption] = useState(post?.caption || '');
  const [hashtags, setHashtags] = useState(
      post?.hashtags?.join(', ') || ''
  );

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
              caption,
              hashtags: hashtags
                  .split(',')
                  .map(tag => tag.trim())
                  .filter(tag => tag !== '')
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

      <input
          type="text"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="travel, beach, photography"
      />

      <button type="submit">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;