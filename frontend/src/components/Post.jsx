import { Link } from 'react-router-dom';
import LikePost from './LikePost';

const Post = ({ post }) => {
  return (
    <article
        style={{
            backgroundColor: '#fffaf2',
            borderRadius: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        }}
    >
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
        padding: '15px 20px',
        gap: '12px'
    },

    avatarPlaceholder: {
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        backgroundColor: '#d6c4b2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px'
    },

    username: {
        fontWeight: 'bold',
        color: '#5c4033',
        textDecoration: 'none',
        fontSize: '18px'
    },

    timestamp: {
        color: '#6d5d4f',
        fontSize: '13px',
        marginLeft: 'auto'
    },

    imagePlaceholder: {
        width: '100%',
        height: '350px',
        backgroundColor: '#e8dfd1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777'
    },

    content: {
        padding: '20px'
    },

    caption: {
        color: '#5c4033',
        fontSize: '16px',
        marginBottom: '15px'
    },

    stats: {
        display: 'flex',
        gap: '20px',
        color: '#6d5d4f'
    },

    image: {
        width: '100%',
        height: '450px',
        objectFit: 'cover',
        borderRadius: '10px'
    }
};

export default Post;