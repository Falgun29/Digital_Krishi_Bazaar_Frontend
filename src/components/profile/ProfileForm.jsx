import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import '../../styles/Profile.css'
import { updateUser } from "../../services/editProfile.service";

const ProfileForm = ({ profile, onCancel, onSuccess }) => {
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const payload = {
      userName: form.name,
      email: form.email,
      mobile: form.phone,
      address: form.address
    };

    try {
      setSaving(true);
      await updateUser(profile.id, payload);
      alert("Profile updated successfully ✅");
      onSuccess(form);
    } catch (err) {
      alert("Failed to update profile ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
  <div className="profile-container">
    <div className="profile-card">
      <h2>Edit Profile</h2>

      <div className="form-group">
        <label>Name</label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>

      <button
        style={{ background: "#9e9e9e", marginTop: "10px" }}
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </div>
);

};

export default ProfileForm;
