import Navigation from '../components/Navigation';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import SearchInput from '../components/SearchInput';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [feedType, setFeedType] = useState('global');
  const [sortType, setSortType] = useState('latest');

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      fetch('http://localhost:3000/api/posts')
          .then(response => response.json())
          .then(data => setPosts(data))
          .catch(error => console.error(error));
  }, []);

  useEffect(() => {
        const params = new URLSearchParams(
            location.search
        );

        const tag = params.get('search');

        setSearchTerm(tag || '');
    }, [location]);


  const currentUser = JSON.parse(
      localStorage.getItem('currentUser')
  );

  const displayedPosts = posts
      .filter(post => {
        if (feedType === 'global') {
            return true;
        }

        const currentUserData = JSON.parse(
            localStorage.getItem('currentUserData')
        );

        const friendUsernames =
            currentUserData?.friends?.map(
                friend => friend.username
            ) || [];

        return friendUsernames.includes(
            post.username
        );
    })

      .filter(post =>
          (post.caption || '')
              .toLowerCase()
              .includes(searchTerm.toLowerCase())

          ||

          (post.username || '')
              .toLowerCase()
              .includes(searchTerm.toLowerCase())

          ||
          
          (post.hashtags || [])
              .join(' ')
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
      )
      
      .sort((a, b) =>
            sortType === 'latest'
                ? new Date(b.timestamp || 0) -
                new Date(a.timestamp || 0)
                : (b.comments?.length || 0) -
                (a.comments?.length || 0)
        );

  return (
    <div>
      <Navigation />
      <main>
        <aside>
          <h3>Welcome!</h3>
        </aside>
        <section>
          <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
          />
          <CreatePost
              posts={posts}
              setPosts={setPosts}
          />
          <button onClick={() => setFeedType('global')}>
              Global Feed
          </button>

          <button onClick={() => setFeedType('local')}>
              Local Feed
          </button>

          <button onClick={() => setSortType('latest')}>
              Newest
          </button>
            
          <button onClick={() => setSortType('popular')}>
              Most Popular
          </button>

          <Feed
              posts={displayedPosts}
              setPosts={setPosts}
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;