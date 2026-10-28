import PostPreview from './PostPreview';

const Feed = ({ posts, setPosts }) => {
  return (
    <section>

      {posts.length === 0 ? ( <p>No posts matched your search.</p>) : ( posts.map(post => (
          <PostPreview
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
          />
        ))
      )}

    </section>
  );
};

export default Feed;