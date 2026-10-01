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
            owner: 'nina'
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
        <form onSubmit={handleSubmit}>
            <h3>Create Album</h3>

            <div>
                <label>Album Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label>Hashtags</label>
                <input
                    type="text"
                    placeholder="travel, memories, holiday"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                />
            </div>

            <button type="submit">
                Create Album
            </button>
        </form>
    );
};

export default CreateAlbum;