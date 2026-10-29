import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PostPreview from '../components/PostPreview';
import EditAlbum from '../components/EditAlbum';
import DeleteAlbum from '../components/DeleteAlbum';
import { useEffect, useState } from 'react';


const AlbumPage = () => {
    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState('');
    const [showPostSelector, setShowPostSelector] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/albums')
            .then(response => response.json())
            .then(data => {
                const foundAlbum = data.find(
                    album => album._id === id
                );

                setAlbum(foundAlbum);
            })
            .catch(error => console.error(error));

        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(error => console.error(error));
    }, [id]);

    if (!album) {
        return (
            <div>
                <Navigation />
                <h2>Loading...</h2>
            </div>
        );
    }

    const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    );

    const isOwner =
        currentUser?.username === album.owner;

    const handleAddToAlbum = async () => {
        try {

            await fetch(
                `http://localhost:3000/api/albums/${album._id}/add-post`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postId: selectedPost
                    })
                }
            );

            alert('Post added to album!');

            setShowPostSelector(false);
            setSelectedPost('');

            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    const handleRemovePost = async (postId) => {
        try {

            await fetch(
                `http://localhost:3000/api/albums/${album._id}/remove-post`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postId
                    })
                }
            );

            alert('Post removed from album!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navigation />

            <h1>{album.name}</h1>

            <p>{album.description}</p>

            <p>
                {(album.hashtags || []).map(tag => (
                    <span key={tag}>
                        #{tag}{' '}
                    </span>
                ))}
            </p>

            <h3>Posts In Album</h3>

            {album.posts?.length === 0 ? (
                <p>No posts in album yet.</p>
            ) : (
                (album.posts || []).map(postId => {
                    const post = posts.find(
                        p => p._id === postId
                    );

                    if (!post) return null;

                    return (
                        <div key={postId}>
                            <PostPreview
                                post={post}
                                posts={posts}
                                setPosts={setPosts}
                            />

                            {isOwner && (
                                <button
                                    onClick={() =>
                                        handleRemovePost(postId)
                                    }
                                >
                                    Remove From Album
                                </button>
                            )}

                        </div>
                    );
                })
            )}

            {isOwner && (
                <>

                    <EditAlbum album={album} />

                    <DeleteAlbum album={album} />

                    <button
                        onClick={() =>
                            setShowPostSelector(
                                !showPostSelector
                            )
                        }
                    >
                        Add Post
                    </button>

                    {showPostSelector && (
                        <div>

                            <select
                                value={selectedPost}
                                onChange={(e) =>
                                    setSelectedPost(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select Post
                                </option>

                                {posts
                                    .filter(
                                        post =>
                                            post.userId ===
                                            currentUser?.id
                                    )
                                    .map(post => (
                                        <option
                                            key={post._id}
                                            value={post._id}
                                        >
                                            {post.caption}
                                        </option>
                                    ))}
                            </select>

                            <button
                                onClick={handleAddToAlbum}
                            >
                                Add
                            </button>

                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default AlbumPage;