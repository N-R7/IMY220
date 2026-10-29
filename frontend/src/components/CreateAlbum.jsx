import { useState } from 'react';

const CreateAlbum = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAlbum = {
            name,
            description,
            hashtags: hashtags.split(',').map(tag => tag.trim()),
            owner: JSON.parse(
                localStorage.getItem('currentUser')
            )?.username
        };

        try {
            const response = await fetch(
                'http://localhost:3000/api/albums',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newAlbum)
                }
            );

            if (response.ok) {
                alert('Album created successfully!');

                setName('');
                setDescription('');
                setHashtags('');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={styles.card}
        >
            <h3>Create Album</h3>

            <div>
                <label>Album Name</label>
                <input
                    style={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    style={styles.input}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label>Hashtags</label>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="travel, memories, holiday"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                />
            </div>

            <button type="submit" style={styles.button}>
                Create Album
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
        marginBottom: '20px'
    },

    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        marginBottom: '15px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2'
    },

    button: {
        backgroundColor: '#8b5e3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px'
    }
};

export default CreateAlbum;