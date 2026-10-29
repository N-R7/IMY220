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
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [showAlbums, setShowAlbums] = useState(false);

  const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    );

    if (!currentUser) {
        window.location.href = '/';
        return null;
    }

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

      fetch('http://localhost:3000/api/albums')
          .then(response => response.json())
          .then(data => {
              setAlbums(data);
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

  const handleAddToAlbum = async () => {
      try {

          await fetch(
              `http://localhost:3000/api/albums/${selectedAlbum}/add-post`,
              {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      postId: post._id
                  })
              }
          );

          alert('Post added to album!');

      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div style={{
        backgroundColor: '#f5efe6',
        minHeight: '100vh'
    }}>
      <Navigation />
            <main style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '20px'
        }}>
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
                <button onClick={() =>
                        setShowAlbums(!showAlbums) }>
                    Add To Album
                </button>
                {showAlbums && (
                  <div>

                      <select
                          value={selectedAlbum}
                          onChange={(e) =>
                              setSelectedAlbum(e.target.value)
                          }
                      >
                          <option value="">
                              Select Album
                          </option>

                          {albums.map(album => (
                              <option
                                  key={album._id}
                                  value={album._id}
                              >
                                  {album.name}
                              </option>
                          ))}
                      </select>

                      <button onClick={handleAddToAlbum}>
                          Add
                      </button>

                  </div>
                )}
            </>
        )}
      </main>
    </div>
  );
};

export default PostPage;