const Comments = ({ comments }) => {
  return (
    <section>
      <h4>Comments</h4>
      {comments.map(comment => (
        <div key={comment.id}>
          <strong>{comment.username}</strong>
          <span>{comment.text}</span>
        </div>
      ))}
    </section>
  );
};

export default Comments;