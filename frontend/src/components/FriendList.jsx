const FriendsList = ({ friends }) => {
  return (
    <section>
      <h3>Friends</h3>

      {friends.map((friend, index) => (
        <div key={index}>
          {friend}
        </div>
      ))}
    </section>
  );
};

export default FriendsList;