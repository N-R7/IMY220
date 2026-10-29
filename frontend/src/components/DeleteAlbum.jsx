const DeleteAlbum = ({ album }) => {

    const handleDelete = async () => {
        try {

            await fetch(
                `http://localhost:3000/api/albums/${album._id}`,
                {
                    method: 'DELETE'
                }
            );

            alert('Album deleted!');

            window.location.href = '/profile';

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete Album
        </button>
    );
};

export default DeleteAlbum;