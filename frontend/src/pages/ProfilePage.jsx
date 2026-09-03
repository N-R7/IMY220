import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import FriendsList from '../components/FriendsList';
import CreatePost from '../components/CreatePost';
import PostPreview from '../components/PostPreview';
import { dummyUser, dummyPosts } from '../dummyData';

const ProfilePage = () => { 
  const { id } = useParams();
  const userPosts = dummyPosts.filter(post => post.userId === parseInt(id));

  return (
    <div>
      <Navigation />
      <main>
        <section>
          <Profile user={dummyUser} />
          <EditProfile />
        </section>
        
        <section>
          <FriendsList friends={dummyUser.friends} />
        </section>
        
        <section>
          <h3>My Posts</h3>
          <CreatePost />
          {userPosts.map(post => (
            <PostPreview key={post.id} post={post} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;    