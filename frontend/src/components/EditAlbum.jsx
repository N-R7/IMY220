import { useState } from 'react';

const EditAlbum = ({ album }) => {
    const [name, setName] = useState(album.name);
    const [description, setDescription] = useState(album.description);
    const [hashtags, setHashtags] = useState(
        album.hashtags?.join(', ') || ''
    );

    const handleUpdate = async () => {
        try {

            await fetch(
                `http://localhost:3000/api/albums/${album._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        hashtags: hashtags
                            .split(',')
                            .map(tag => tag.trim())
                            .filter(tag => tag !== '')
                    })
                }
            );

            alert('Album updated!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.card}>

            <h3>Edit Album</h3>

            <input
                style={styles.input}
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <textarea
                style={styles.input}
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <input
                style={styles.input}
                value={hashtags}
                onChange={(e) =>
                    setHashtags(e.target.value)
                }
            />

            <button style={styles.button}onClick ={handleUpdate}>
                Save Album
            </button>

        </div>
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
        cursor: 'pointer'
    }
};

export default EditAlbum;