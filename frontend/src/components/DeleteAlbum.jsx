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

            window.location.href = '/home';

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            style={styles.button}
            onClick={handleDelete}
        >
            Delete Album
        </button>
    );
};

const styles = {
    button: {
        backgroundColor: '#b23a48',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 16px',
        cursor: 'pointer',
        marginRight: '10px'
    }
};

export default DeleteAlbum;