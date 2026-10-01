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

  return (
    <div>
      <Navigation />
      <main>
        <section>
          <Profile user={user} />
          <EditProfile />
        </section>
        
        <section>
          <FriendsList friends={user?.friends || []} />
        </section>
        
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