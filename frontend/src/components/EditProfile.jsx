const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Profile</h4>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Full Name" />
      <textarea placeholder="Bio"></textarea>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;