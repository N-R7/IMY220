import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Post from '../components/Post';
import Comments from '../components/Comments';
import EditPost from '../components/EditPost';
import { dummyPosts, dummyComments } from '../dummyData';

const PostPage = () => {
  const { id } = useParams();
  const post = dummyPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div>
        <Navigation />
        <main><h2>Post not found</h2></main>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <main>
        <Post post={post} />
        <Comments comments={dummyComments} />
        <EditPost />
      </main>
    </div>
  );
};

export default PostPage;