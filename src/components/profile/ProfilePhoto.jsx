import { useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import defaultUser from "../../assets/banners/bg1.jpg";

const ProfilePhoto = ({ editable }) => {
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="profile-photo">
      <div className="photo-wrapper">
        <img
          src={photo || defaultUser}
          alt="Profile"
          className="avatar-img"
        />

        {editable && (
          <>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
            <label htmlFor="profilePhoto" className="photo-edit-btn">
              <MdPhotoCamera size={18} />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
