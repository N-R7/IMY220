import PostPreview from './PostPreview';

const Feed = ({ posts }) => {
  return (
    <section>

      {posts.length === 0 ? ( <p>No posts matched your search.</p>) : ( posts.map(post => (
          <PostPreview
            key={post._id}
            post={post}
          />
        ))
      )}

    </section>
  );
};

export default Feed;