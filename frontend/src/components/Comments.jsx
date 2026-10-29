import { useState } from 'react';

const Comments = ({ comments, postId }) => {
    const [newComment, setNewComment] = useState('');

    const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    );

    const handleComment = async () => {
        try {
            await fetch(
                `http://localhost:3000/api/posts/${postId}/comment`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        comment: {
                            username: currentUser?.username,
                            text: newComment
                        }
                    })
                }
            );

            alert('Comment added!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <h4>Comments</h4>

            {comments.map((comment, index) => (
                <div key={index}>
                    <strong>{comment.username}</strong>
                    <span> {comment.text}</span>
                </div>
            ))}

            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />

            <button onClick={handleComment}>
                Add Comment
            </button>
        </section>
    );
};

export default Comments;