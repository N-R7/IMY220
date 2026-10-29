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
        <div>
            <p>
                This post has been reported
                multiple times.
            </p>

            <button
                onClick={() =>
                    setShowPost(true)
                }
            >
                View Post
            </button>
        </div>
    );
};

export default ReportedPostCard