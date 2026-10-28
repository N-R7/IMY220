import { Link } from 'react-router-dom';
import { useState } from 'react';

const PostPreview = ({ post }) => {
  const handleDelete = async (id) => {
      try {
          await fetch(
              `http://localhost:3000/api/posts/${id}`,
              {
                  method: 'DELETE'
              }
          );

          window.location.reload();

      } catch (error) {
          console.error(error);
      }
  };

  const [reportReason, setReportReason] = useState('');

  const handleReport = async (id) => {
      try {
          await fetch(
              `http://localhost:3000/api/posts/${id}/report`,
              {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      reason: reportReason
                  })
              }
          );

          alert('Post reported!');

      } catch (error) {
          console.error(error);
      }
  };

  return (
    <article style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatarPlaceholder}>👤</div>
        <span style={styles.username}>{post.username}</span>
        <span style={styles.timestamp}>
          {post.timestamp
          ? new Date(post.timestamp).toLocaleDateString()
          : ""}
        </span>
      </div>
      
      <Link to={`/post/${post._id}`}>
        <div style={styles.imagePlaceholder}>
          IMAGE HERE
        </div>
      </Link>
      
      <div style={styles.content}>
        <p style={styles.caption}>{post.caption}</p>
        <div style={styles.stats}>
          <span>{post.likes} likes</span>
          <span>{post.comments?.length || 0} comments</span>
        </div>
        <button onClick={() => handleDelete(post._id)}>
          Delete
        </button>
        <select
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
      >
          <option value="">
              Select reason
          </option>

          <option value="Spam">
              Spam
          </option>

          <option value="Inappropriate Content">
              Inappropriate Content
          </option>

          <option value="Harassment">
              Harassment
          </option>

          <option value="Other">
              Other
          </option>
      </select>
        <button onClick={() => handleReport(post._id)}>
            Report
        </button>
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
  }
};

export default PostPreview;