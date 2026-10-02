import { Link } from 'react-router-dom';

const FriendsList = ({ friends }) => {
    return (
        <section>
            <h3>Friends</h3>

            {friends.map((friend, index) => (

                <div key={index}>

                    {friend === 'nina' && (
                        <Link to="/profile/6abecac2118f4eb6318af9b2">
                            nina
                        </Link>
                    )}

                    {friend === 'sam' && (
                        <Link to="/profile/6abecadf118f4eb6318af9b4">
                            sam
                        </Link>
                    )}

                    {friend === 'bob' && (
                        <Link to="/profile/6abedf2b6e7fdb823c9171c3">
                            bob
                        </Link>
                    )}

                </div>

            ))}
        </section>
    );
};

export default FriendsList;