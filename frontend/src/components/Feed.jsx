import PostPreview from './PostPreview';
import ReportedPostCard from './ReportedPostCard';

const Feed = ({ posts, setPosts }) => {
    return (
        <section
            style={{
                display: 'grid',
                gridTemplateColumns:
                    'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '20px'
            }}
        >

            {posts.length === 0 ? (
                <p>No posts matched your search.</p>
            ) : (
                posts.map(post =>
                    (post.reportCount || 0) >= 3 ? (
                        <ReportedPostCard
                            key={post._id}
                            post={post}
                            posts={posts}
                            setPosts={setPosts}
                        />
                    ) : (
                        <PostPreview
                            key={post._id}
                            post={post}
                            posts={posts}
                            setPosts={setPosts}
                        />
                    )
                )
            )}

        </section>
    );
};

export default Feed;