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
        <div>

            <h3>Edit Album</h3>

            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <textarea
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <input
                value={hashtags}
                onChange={(e) =>
                    setHashtags(e.target.value)
                }
            />

            <button onClick={handleUpdate}>
                Save Album
            </button>

        </div>
    );
};

export default EditAlbum;