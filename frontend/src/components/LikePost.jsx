import { useState } from 'react';

const LikePost = ({ post }) => {
    const [likes, setLikes] = useState(
        post.likes || 0
    );

    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        try {

            const route = liked
                ? `http://localhost:3000/api/posts/${post._id}/unlike`
                : `http://localhost:3000/api/posts/${post._id}/like`;

            await fetch(route, {
                method: 'PUT'
            });

            if (liked) {
                setLikes(
                    Math.max(likes - 1, 0)
                );
            } else {
                setLikes(likes + 1);
            }

            setLiked(!liked);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleLike}>
            {liked ? '❤️' : '🤍'} {likes}
        </button>
    );
};

export default LikePost;