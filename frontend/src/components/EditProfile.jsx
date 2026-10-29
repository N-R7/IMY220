import { useState, useEffect } from 'react';


const EditProfile = ({ user }) => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setBio(user.bio || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        bio
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert('Profile updated successfully!');
                window.location.reload();
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(
                `http://localhost:3000/api/users/${user._id}`,
                {
                    method: 'DELETE'
                }
            );

            alert('Profile deleted!');
            window.location.href = '/';

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}
             style={styles.card}>

            <h4>Edit Profile</h4>

            <input style={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <textarea style={styles.input}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <button type="submit"
                    style={styles.button}>
                Save Changes
            </button>
            <button type="button"
                    style={styles.deleteButton}
                    onClick={handleDelete}
            >
                Delete Profile
            </button>
        </form>
    );
};

const styles = {
    card: {
        backgroundColor: '#fffaf2',
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        marginTop: '20px'
    },

    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px',
        marginRight: '10px',
        cursor: 'pointer'
    },

    deleteButton: {
        backgroundColor: '#b23a48',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px',
        cursor: 'pointer'
    }
};

export default EditProfile;