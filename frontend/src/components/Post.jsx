import { Link } from 'react-router-dom';
import LikePost from './LikePost';

const Post = ({ post }) => {
  return (
    <article>
      <div style={styles.header}>
        <div style={styles.avatarPlaceholder}>👤</div>
        <Link
            to={post.userId ? `/profile/${post.userId}` : '#'}
            style={styles.username}
        >
            {post.username}
        </Link>
        <span style={styles.timestamp}>
          {new Date(post.timestamp).toLocaleDateString()}
        </span>
      </div>
      
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
        </div>
      </div>
    </article>
  );
};

const styles = {
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

export default Post;