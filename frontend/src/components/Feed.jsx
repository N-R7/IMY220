import PostPreview from './PostPreview';

const Feed = ({ posts }) => {
  return (
    <section>
      {posts.map(post => (
        <PostPreview key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Feed;