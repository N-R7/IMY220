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
        <button
            style={
                liked
                    ? styles.likedButton
                    : styles.button
            }
            onClick={handleLike}
        >
            {liked ? '❤️' : '🤍'} {likes}
        </button>
    );
};

const styles = {
    button: {
        backgroundColor: '#fffaf2',
        border: '1px solid #d6c4b2',
        borderRadius: '25px',
        padding: '8px 14px',
        cursor: 'pointer',
        color: '#5c4033',
        fontWeight: 'bold'
    },

    likedButton: {
        backgroundColor: '#ffe8ec',
        border: '1px solid #ffb3c1',
        borderRadius: '25px',
        padding: '8px 14px',
        cursor: 'pointer',
        color: '#b23a48',
        fontWeight: 'bold'
    }
};

export default LikePost;