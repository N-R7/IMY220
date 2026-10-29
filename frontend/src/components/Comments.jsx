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
        <section style={styles.comments}>
            <h4>Comments</h4>

            {comments.map((comment, index) => (
                <div key={index}>
                    <strong>{comment.username}</strong>
                    <span> {comment.text}</span>
                </div>
            ))}

            <input style={styles.input}
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />

            <button style={styles.button} onClick={handleComment}>
                Add Comment
            </button>
        </section>
    );
};

const styles = {
    comments: {
        backgroundColor: '#fffaf2',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginTop: '20px'
    },

    input: {
        width: '100%',
        padding: '10px',
        marginTop: '10px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2'
    },

    button: {
        marginTop: '10px',
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px'
    }
};

export default Comments;