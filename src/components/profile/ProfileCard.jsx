import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/editProfile.service";
import ProfileForm from "./ProfileForm";
import '../../styles/Profile.css'

const ProfileCard = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(user.id)
      .then(res => {
        const u = res.data;
        setProfile({
          id: u.userId,
          name: u.userName,
          email: u.email,
          phone: u.mobile || "",
          role: u.roles?.[0]?.roleName || "",
          address: u.address || ""
        });
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <p className="center">Loading profile...</p>;
  if (!profile) return null;

  /* EDIT MODE */
  if (editing) {
    return (
      <ProfileForm
        profile={profile}
        onCancel={() => setEditing(false)}
        onSuccess={(updatedProfile) => {
          setProfile(updatedProfile);
          setEditing(false);
        }}
      />
    );
  }

  /* VIEW MODE */
  return (
  <div className="profile-container">
    <div className="profile-card">
      <h2>My Profile</h2>

      <div className="form-group">
        <label>Name</label>
        <p>{profile.name}</p>
      </div>

      <div className="form-group">
        <label>Email</label>
        <p>{profile.email}</p>
      </div>

      <div className="form-group">
        <label>Phone</label>
        <p>{profile.phone || "-"}</p>
      </div>

      <div className="form-group">
        <label>Role</label>
        <p>{profile.role}</p>
      </div>

      <div className="form-group">
        <label>Address</label>
        <p>{profile.address || "-"}</p>
      </div>

      <button onClick={() => setEditing(true)}>
        Edit Profile
      </button>
    </div>
  </div>
);
};

export default ProfileCard;
