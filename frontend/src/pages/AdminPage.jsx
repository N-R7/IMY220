import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';

const AdminPage = () => {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [reportedPosts, setReportedPosts] = useState([]);
    const [newReason, setNewReason] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error(error));
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setReportedPosts(
                    data.filter(
                        post => post.reported
                    )
                );
            })
            .catch(error => console.error(error));
    }, []);

    const handleDeleteUser = async (id) => {
        try {

            await fetch(
                `http://localhost:3000/api/users/${id}`,
                {
                    method: 'DELETE'
                }
            );

            setUsers(
                users.filter(
                    user => user._id !== id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletePost = async (id) => {
        try {

            await fetch(
                `http://localhost:3000/api/posts/${id}`,
                {
                    method: 'DELETE'
                }
            );

            setPosts(
                posts.filter(
                    post => post._id !== id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const handleAddReason = async () => {
        try {

            await fetch(
                'http://localhost:3000/api/report-reasons',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reason: newReason
                    })
                }
            );

            alert('Reason added!');
            setNewReason('');

        } catch (error) {
            console.error(error);
        }
    };

    const handleDismissReport = async (id) => {
        try {

            await fetch(
                `http://localhost:3000/api/posts/${id}/dismiss-report`,
                {
                    method: 'PUT'
                }
            );

            setReportedPosts(
                reportedPosts.filter(
                    post => post._id !== id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navigation />

            <h1>Admin Panel</h1>

            <h2>Manage Report Reasons</h2>

            <input
                value={newReason}
                onChange={(e) =>
                    setNewReason(e.target.value)
                }
                placeholder="Copyright Violation"
            />

            <button onClick={handleAddReason}>
                Add Reason
            </button>

            <h2>Users</h2>

            {users.map(user => (
                <div key={user._id}>
                    <strong>{user.username}</strong>
                    {' '}
                    ({user.role})

                    <button onClick={() => handleDeleteUser(user._id)}>
                        Delete
                    </button>
                </div>
            ))}

            <h2>Posts</h2>

            {posts.map(post => (
                <div key={post._id}>

                    <strong>
                        {post.username}
                    </strong>

                    {' - '}

                    {post.caption}

                    <button
                        onClick={() =>
                            handleDeletePost(post._id)
                        }
                    >
                        Delete
                    </button>

                </div>
            ))}

            <h2>Reported Posts</h2>

                {reportedPosts.map(post => (
                    <div key={post._id}>

                        <strong>
                            {post.username}
                        </strong>

                        {' - '}

                        {post.caption}

                        <br />

                        Reason:

                        {' '}

                        {post.reportReason}

                        <br />

                        <button
                            onClick={() =>
                                handleDeletePost(post._id)
                            }
                        >
                            Delete Post
                        </button>

                        <button
                            onClick={() =>
                                handleDismissReport(post._id)
                            }
                        >
                            Dismiss Report
                        </button>

                    </div>
                ))}
        </div>
    );
};

export default AdminPage;