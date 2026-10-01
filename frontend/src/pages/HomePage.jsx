import Navigation from '../components/Navigation';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import SearchInput from '../components/SearchInput';

import { useEffect, useState } from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error(error));
}, []);
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
          <Feed posts={posts} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;