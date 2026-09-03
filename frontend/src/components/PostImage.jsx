// frontend/src/components/PostImage.jsx
const PostImage = ({ src, alt }) => {
  return (
    <div style={styles.imagePlaceholder}>
      IMAGE HERE
    </div>
  );
};

const styles = {
  imagePlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '14px'
  }
};

export default PostImage;