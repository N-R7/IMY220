import { useState } from 'react';
import PostPreview from './PostPreview';

const ReportedPostCard = ({
    post,
    posts,
    setPosts
}) => {
    const [showPost, setShowPost] =
        useState(false);

    if (showPost) {
        return (
            <PostPreview
                post={post}
                posts={posts}
                setPosts={setPosts}
            />
        );
    }

    return (
        <div style={styles.card}>
            <h3 style={styles.title}>
                ⚠️ Reported Content
            </h3>

            <p style={styles.text}>
                This post has been reported multiple
                times by users and has been hidden
                from the feed.
            </p>

            <button
                style={styles.button}
                onClick={() =>
                    setShowPost(true)
                }
            >
                View Post Anyway
            </button>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fffaf2',
        borderRadius: '18px',
        padding: '25px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        borderLeft: '6px solid #b23a48',

        height: '80%'
    },

    title: {
        color: '#b23a48',
        marginBottom: '10px'
    },

    text: {
        color: '#5c4033',
        marginBottom: '15px'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px',
        cursor: 'pointer'
    }
};

export default ReportedPostCard