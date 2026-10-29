import { Link } from 'react-router-dom';
import ReportPost from './ReportPost';
import LikePost from './LikePost';

const PostPreview = ({post, posts, setPosts}) => {
  const handleDelete = async (id) => {
      try {
          await fetch(
              `http://localhost:3000/api/posts/${id}`,
              {
                  method: 'DELETE'
              }
          );

          setPosts( posts.filter( p => p._id !== id));

      } catch (error) {
          console.error(error);
      }
  };

  const currentUser = JSON.parse(
      localStorage.getItem('currentUser')
  );

  const isOwner =
      currentUser?.id === post.userId;

  return (
    <article style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatarPlaceholder}>👤</div>
        <Link
            to={post.userId ? `/profile/${post.userId}`: '#'}
            style={styles.link}
        >
            {post.username}
        </Link>
        <span style={styles.timestamp}>
          {post.timestamp
          ? new Date(post.timestamp).toLocaleDateString()
          : ""}
        </span>
      </div>
      
      <Link to={`/post/${post._id}`}>
        {post.image && post.image.startsWith('/uploads/') ? (
            <img
                src={`http://localhost:3000${post.image}`}
                alt="Post"
                style={styles.image}
            />
        ) : (
            <div style={styles.imagePlaceholder}>
                No Image Available
            </div>
        )}
      </Link>
      
      <div style={styles.content}>
        <p style={styles.caption}>{post.caption}</p>
        <p>
            {post.hashtags?.map(tag => (
                <span key={tag}>
                    #{tag}{' '}
                </span>
            ))}
        </p>
        <div style={styles.stats}>
          <LikePost post={post} />
          <span>{post.comments?.length || 0} comments</span>
        </div>
        {isOwner && (
            <button onClick={() => handleDelete(post._id)}>
                Delete
            </button>
        )}
        {!isOwner && (
            <ReportPost postId={post._id} />
        )}
      </div>
    </article>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    marginBottom: '20px',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    gap: '10px'
  },
  avatarPlaceholder: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: '#666'
  },
  username: {
    fontWeight: 'bold'
  },
  timestamp: {
    color: '#666',
    fontSize: '12px',
    marginLeft: 'auto'
  },
  imagePlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '14px'
  },
  content: {
    padding: '12px 16px'
  },
  caption: {
    marginBottom: '8px'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    color: '#666',
    fontSize: '14px'
  },
  image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
  }
};

export default PostPreview;