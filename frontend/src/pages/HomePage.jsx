import Navigation from '../components/Navigation';
import Feed from '../components/Feed';
import CreatePost from '../components/CreatePost';
import SearchInput from '../components/SearchInput';
import { dummyPosts } from '../dummyData';

const HomePage = () => {
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
          <Feed posts={dummyPosts} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;