import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import FriendsList from '../components/FriendList';
import CreatePost from '../components/CreatePost';
import PostPreview from '../components/PostPreview';
import CreateAlbum from '../components/CreateAlbum';
import AlbumPreview from '../components/AlbumPreview';

import { useState, useEffect } from 'react';

const ProfilePage = () => { 
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');

  const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    );

  const isOwnProfile =
        currentUser?.id === id;

  const isFriend =
    user?.friends?.some(
        friend =>
            friend.username === currentUser?.username
    );

  useEffect(() => {
      fetch('http://localhost:3000/api/users')
          .then(response => response.json())
          .then(data => {
              const foundUser = data.find(
                  user => user._id === id
              );

              setUser(foundUser);

              setFriendRequests(
                foundUser?.friendRequests || []
              );

          })
          .catch(error => console.error(error));

      fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        })
        .catch(error => console.error(error));

        fetch('http://localhost:3000/api/albums')
          .then(response => response.json())
          .then(data => {
              setAlbums(data);
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

  const userPosts = posts.filter(
        post => post.userId === user._id
    );

  const userAlbums = albums.filter(
        album => album.owner === user.username
    );

  const handleAddFriend = async () => {
      try {
          await fetch(
              `http://localhost:3000/api/users/${user._id}/request`,
              {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    username: currentUser?.username
                })
              }
          );

          alert('Friend request sent!');
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
                    friend: currentUser?.username
                })
              }
          );

          alert('Friend removed!');
          window.location.reload();

      } catch (error) {
          console.error(error);
      }
  };

  const handleAcceptRequest = async (username) => {
    try {

        await fetch(
            `http://localhost:3000/api/users/${user._id}/accept-request`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username
                })
            }
        );

        alert('Friend request accepted!');
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
            {isOwnProfile && (
                <EditProfile user={user} />
            )}
        </section>
        
        <section>
            {!isOwnProfile && (
                <p>
                    Friend Status:{' '}

                    {isFriend
                        ? 'Friends'
                        : friendRequests.includes(
                            currentUser?.username
                        )
                        ? 'Friend Request Pending'
                        : 'Not Friends'}
                </p>
            )}
          {(isOwnProfile || isFriend) ? (<FriendsList friends={user?.friends || []} />)
           : (<p>Friends list is private.</p>)}
          {isOwnProfile && (
                <>
                    <h3>Friend Requests</h3>

                    {friendRequests.map((request, index) => (
                        <div key={index}>
                            {request}

                            <button
                                onClick={() =>
                                    handleAcceptRequest(request)
                                }
                            >
                                Accept
                            </button>
                        </div>
                    ))}
                </>
            )}
        </section>
        {!isOwnProfile && (
            <>
                <button onClick={handleAddFriend}>
                    Add Friend
                </button>

                <button onClick={handleUnfriend}>
                    Unfriend
                </button>
            </>
        )}

        <div>

            <button onClick={() => setActiveTab('posts')}>
                Posts
            </button>

            <button onClick={() => setActiveTab('albums')}>
                Albums
            </button>

        </div>
        
        {activeTab === 'posts' && (
            <section>

                <h3>My Posts</h3>

                {isOwnProfile && (
                    <CreatePost
                        posts={posts}
                        setPosts={setPosts}
                    />
                )}

                {userPosts.map(post => (
                    <PostPreview
                        key={post._id}
                        post={post}
                    />
                ))}

            </section>
        )}

        {activeTab === 'albums' && (
            <section>

                <h3>Albums</h3>

                {isOwnProfile && (
                    <CreateAlbum />
                )}

                {userAlbums.map(album => (
                    <AlbumPreview
                        key={album._id}
                        album={album}
                    />
                ))}

            </section>
        )}

      </main>
    </div>
  );
};

export default ProfilePage;    