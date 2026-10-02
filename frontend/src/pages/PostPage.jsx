import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Post from '../components/Post';
import Comments from '../components/Comments';
import EditPost from '../components/EditPost';

import { useState, useEffect } from 'react';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
      fetch('http://localhost:3000/api/posts')
          .then(response => response.json())
          .then(data => {
              const foundPost = data.find(
                  p => p._id === id
              );

              setPost(foundPost);
          })
          .catch(error => console.error(error));
  }, [id]);

  if (post === null) {
    return (
      <div>
        <Navigation />
        <main><h2>Loading...</h2></main>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <main>
        <Post post={post} />
        <Comments comments={post.comments} 
          postId={post._id}/>
        <EditPost post={post} />
      </main>
    </div>
  );
};

export default PostPage;