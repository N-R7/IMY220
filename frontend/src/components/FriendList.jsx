import ProfilePreview from './ProfilePreview';

const FriendsList = ({ friends }) => {
  return (
    <section>
      <h3>Friends</h3>
      {friends.map(friend => (
        <ProfilePreview key={friend.id} user={friend} />
      ))}
    </section>
  );
};

export default FriendsList;