import { useState } from 'react';

const AlbumPreview = ({ album }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(album.name);
    const [description, setDescription] = useState(album.description);

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
                        description
                    })
                }
            );

            alert('Album updated!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(
                `http://localhost:3000/api/albums/${album._id}`,
                {
                    method: 'DELETE'
                }
            );

            alert('Album deleted!');
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h4>{album.name}</h4>
            <p>{album.description}</p>

            <button onClick={() => setEditing(!editing)}>
                Edit
            </button>

            <button onClick={handleDelete}>
                Delete
            </button>

            {editing && (
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button onClick={handleUpdate}>
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlbumPreview;