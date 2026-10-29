import { Link } from 'react-router-dom';

const FriendsList = ({ friends }) => {
    return (
        <section style={styles.section}>
            <h3 style={styles.title}>
                Friends
            </h3>

            {friends.map((friend, index) => (
                <div
                    key={index}
                    style={styles.friendCard}>
                    <Link
                        to={`/profile/${friend.id}`}
                        style={styles.link}>
                        {friend.username}
                    </Link>
                </div>
            ))}
        </section>
    );
};

const styles = {
    section: {
        backgroundColor: '#fffaf2',
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        marginBottom: '20px'
    },

    friendCard: {
        padding: '10px 14px',
        marginBottom: '10px',
        borderRadius: '10px',
        backgroundColor: '#f5efe6'
    },

    link: {
        color: '#5c4033',
        textDecoration: 'none',
        fontWeight: 'bold'
    },

    title: {
        color: '#5c4033',
        marginBottom: '15px'
    }
};

export default FriendsList;