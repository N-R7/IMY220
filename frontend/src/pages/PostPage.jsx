import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Post from '../components/Post';
import Comments from '../components/Comments';
import EditPost from '../components/EditPost';
import ReportPost from '../components/ReportPost';

import { useState, useEffect } from 'react';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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

  const isOwner =
    currentUser?.id === post.userId;

  const handleDelete = async () => {
      try {

          await fetch(
              `http://localhost:3000/api/posts/${post._id}`,
              {
                  method: 'DELETE'
              }
          );

          alert('Post deleted!');
          window.location.href = '/home';

      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div>
      <Navigation />
      <main>
        <Post post={post} />
        <Comments comments={post.comments} 
          postId={post._id}/>
        {!isOwner && (
            <ReportPost postId={post._id} />
        )}
          {isOwner && (
            <>
                <EditPost post={post} />

                <button onClick={handleDelete}>
                    Delete Post
                </button>
            </>
        )}
      </main>
    </div>
  );
};

export default PostPage;