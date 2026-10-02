import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import FriendsList from '../components/FriendList';
import CreatePost from '../components/CreatePost';
import PostPreview from '../components/PostPreview';

import { useState, useEffect } from 'react';

const ProfilePage = () => { 
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      fetch('http://localhost:3000/api/users')
          .then(response => response.json())
          .then(data => {
              setUser(data[0]);
          })
          .catch(error => console.error(error));

      fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        })
        .catch(error => console.error(error));

  }, [id]);

  if (!user) {
      return (
          <div>
              <Navigation />
              <main>
                  <h2>Loading...</h2>
              </main>
          </div>
      );
  }

  const handleAddFriend = async () => {
      try {
          await fetch(
              `http://localhost:3000/api/users/${user._id}/friend`,
              {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      friend: 'bob'
                  })
              }
          );

          alert('Friend added!');
          window.location.reload();

      } catch (error) {
          console.error(error);
      }
  };

  const handleUnfriend = async () => {
      try {
          await fetch(
              `http://localhost:3000/api/users/${user._id}/unfriend`,
              {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      friend: 'bob'
                  })
              }
          );

          alert('Friend removed!');
          window.location.reload();

      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div>
      <Navigation />
      <main>
        <section>
          <Profile user={user} />
          <EditProfile user={user} />
        </section>
        
        <section>
          <FriendsList friends={user?.friends || []} />
        </section>
        <button onClick={handleAddFriend}>
          Add Friend
        </button>
        <button onClick={handleUnfriend}>
            Unfriend
        </button>
        
        <section>
          <h3>My Posts</h3>
          <CreatePost />
          {posts.map(post => (
              <PostPreview key={post._id} post={post} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;    