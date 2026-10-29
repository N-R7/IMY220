import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';

const AdminPage = () => {

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedUsername, setEditedUsername] = useState('');
    const [posts, setPosts] = useState([]);
    const [reportedPosts, setReportedPosts] = useState([]);
    const [newReason, setNewReason] = useState('');
    const [editingPost, setEditingPost] = useState(null);
    const [editedCaption, setEditedCaption] = useState('');

    const currentUser = JSON.parse(
    localStorage.getItem('currentUser')
    );

    if (!currentUser) {
        window.location.href = '/';
        return null;
    }

    if (currentUser?.role !== 'admin') {
        window.location.href = '/home';
        return null;
    }

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

    const handleEditUser = async (id) => {
        try {

            await fetch(
                `http://localhost:3000/api/users/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: editedUsername,
                        bio: ''
                    })
                }
            );

            alert('User updated!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPost = async (id) => {
        try {

            await fetch(
                `http://localhost:3000/api/posts/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        caption: editedCaption,
                        hashtags: []
                    })
                }
            );

            alert('Post updated!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div style={styles.page}>
            <Navigation />

            <div style={styles.container}>

                <h1>Admin Panel</h1>

                <div style={styles.section}>
                    <h2>Manage Report Reasons</h2>

                    <input
                        value={newReason}
                        style={styles.input}
                        onChange={(e) =>
                            setNewReason(e.target.value)
                        }
                        placeholder="Copyright Violation"
                    />

                    <button
                        onClick={handleAddReason}
                        style={styles.button}
                    >
                        Add Reason
                    </button>
                </div>

                <div style={styles.section}>
                    <h2>Users</h2>

                    {users.map(user => (
                        <div key={user._id}>
                            <strong>
                                {user.username}
                            </strong>{' '}
                            ({user.role})

                            <button
                                style={styles.deleteButton}
                                onClick={() =>
                                    handleDeleteUser(
                                        user._id
                                    )
                                }
                            >
                                Delete
                            </button>

                            <button
                                style={styles.button}
                                onClick={() => {
                                    setEditingUser(
                                        user._id
                                    );
                                    setEditedUsername(
                                        user.username
                                    );
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                <div style={styles.section}>
                    <h2>Posts</h2>

                    {posts.map(post => (
                        <div key={post._id}>
                            <strong>
                                {post.username}
                            </strong>{' '}
                            - {post.caption}

                            <button
                                style={styles.deleteButton}
                                onClick={() =>
                                    handleDeletePost(
                                        post._id
                                    )
                                }
                            >
                                Delete
                            </button>

                            <button
                                style={styles.button}
                                onClick={() => {
                                    setEditingPost(
                                        post._id
                                    );
                                    setEditedCaption(
                                        post.caption
                                    );
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                <div style={styles.section}>
                    <h2>Reported Posts</h2>

                    {reportedPosts.map(post => (
                        <div key={post._id}>
                            <strong>
                                {post.username}
                            </strong>{' '}
                            - {post.caption}

                            <br />

                            Reason: {post.reportReason}

                            <br />

                            <button
                                style={styles.deleteButton}
                                onClick={() =>
                                    handleDeletePost(
                                        post._id
                                    )
                                }
                            >
                                Delete Post
                            </button>

                            <button
                                style={styles.button}
                                onClick={() =>
                                    handleDismissReport(
                                        post._id
                                    )
                                }
                            >
                                Dismiss Report
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#f5efe6',
        minHeight: '100vh',
        padding: '20px'
    },

    container: {
        maxWidth: '1200px',
        margin: '0 auto'
    },

    section: {
        backgroundColor: '#fffaf2',
        padding: '20px',
        borderRadius: '18px',
        marginBottom: '20px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        textAlign: 'left'
    },

    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2',
        marginBottom: '10px'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '8px 14px',
        marginRight: '8px',
        cursor: 'pointer'
    },

    deleteButton: {
        backgroundColor: '#b23a48',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '8px 14px',
        marginRight: '8px',
        cursor: 'pointer'
    }
};

export default AdminPage;