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
              <Link
                  key={tag}
                  to={`/home?search=${tag}`}
                  style={{
                      marginRight: '6px',
                      color: 'blue',
                      textDecoration: 'none'
                  }}
              >
                  #{tag}
              </Link>
          ))}
        </p>
        <div style={styles.stats}>
          <LikePost post={post} />
          <span>{post.comments?.length || 0} comments</span>
        </div>
        {post.comments ?.slice(0, 2)
            .map((comment, index) => (
                <div key={index}>
                    <strong>
                        {comment.username}
                    </strong>
                    : {comment.text}
                </div>
        ))}
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
      backgroundColor: '#fffaf2',
      borderRadius: '18px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      marginBottom: '25px',
      overflow: 'hidden',
      maxWidth: '650px',
      margin: '25px auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    gap: '10px'
  },
  avatarPlaceholder: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#d6c4b2'
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
    padding: '20px'
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
      height: '320px',
      objectFit: 'cover'
  }
};

export default PostPreview;