import Navigation from '../components/Navigation';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import SearchInput from '../components/SearchInput';

import { useEffect, useState } from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [feedType, setFeedType] = useState('global');

  useEffect(() => {
      fetch('http://localhost:3000/api/posts')
          .then(response => response.json())
          .then(data => setPosts(data))
          .catch(error => console.error(error));
  }, []);

  const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
  );

  const displayedPosts =
      feedType === 'global'
          ? posts
          : posts.filter(
                post => post.username === currentUser?.username
            );

  return (
    <div>
      <Navigation />
      <main>
        <aside>
          <h3>Welcome!</h3>
        </aside>
        <section>
          <SearchInput />
          <CreatePost />
          <button onClick={() => setFeedType('global')}>
              Global Feed
          </button>

          <button onClick={() => setFeedType('local')}>
              Local Feed
          </button>
          <Feed posts={displayedPosts} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;