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

    if (!currentUser) {
        window.location.href = '/';
        return null;
    }

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
    <div style={styles.page}>
      <Navigation />
      <main style={styles.content}>
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
          <div style={styles.feedTabs}>
            <button
                style={
                    feedType === 'global'
                    ? styles.activeTab
                    : styles.tab
                }
                onClick={() => setFeedType('global')}
            >
                Global
            </button>

            <button
                style={
                    feedType === 'local'
                    ? styles.activeTab
                    : styles.tab
                }
                onClick={() => setFeedType('local')}
            >
                Local
            </button>
        </div>

        <div style={styles.sortTabs}>
            <button
                style={
                    sortType === 'latest'
                    ? styles.activeTab
                    : styles.tab
                }
                onClick={() => setSortType('latest')}
            >
                Newest
            </button>

            <button
                style={
                    sortType === 'popular'
                    ? styles.activeTab
                    : styles.tab
                }
                onClick={() => setSortType('popular')}
            >
                Popular
            </button>
        </div>

          <Feed
              posts={displayedPosts}
              setPosts={setPosts}
          />
        </section>
      </main>
    </div>
  );
};

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f5efe6'
    },

    content: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box'
    },

    toolbar: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '20px'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px',
        cursor: 'pointer'
    },

    feedTabs: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '20px'
    },

    sortTabs: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '10px',
        marginBottom: '25px'
    },

    tab: {
        background: 'none',
        border: 'none',
        color: '#5c4033',
        fontSize: '18px',
        cursor: 'pointer',
        paddingBottom: '5px'
    },

    activeTab: {
        background: 'none',
        border: 'none',
        color: '#5c4033',
        fontSize: '18px',
        cursor: 'pointer',
        paddingBottom: '5px',
        borderBottom: '3px solid #8b5e3c',
        fontWeight: 'bold'
    }
};

export default HomePage;