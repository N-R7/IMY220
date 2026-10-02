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
        <form onSubmit={handleSubmit}>
            <h4>Edit Profile</h4>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <button type="submit">
                Save Changes
            </button>
            <button type="button"
              onClick={handleDelete}>
                Delete Profile
            </button>
        </form>
    );
};

export default EditProfile;