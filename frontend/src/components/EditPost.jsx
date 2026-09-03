const EditPost = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post updated');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Post</h4>
      <textarea placeholder="Edit caption..."></textarea>
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;