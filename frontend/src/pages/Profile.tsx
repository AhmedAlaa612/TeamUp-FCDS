import { useRef, useState } from "react";
import { User } from "../models/profile";

function Profile() {
  const DefaultProfileImage = "/assets/default_profile.svg";
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User>({
    username: "John Doe",
    email: "john@example.com",
    phone_number: "+1234567890",
    linkedin_link: "https://linkedin.com/in/johndoe",
    github_link: "https://github.com/johndoe",
    bio: "Full-stack developer with passion for React and TypeScript",
    img: "",
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API call to save user data
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>

        <div className="profile-image-container" onClick={handleImageClick}>
          <img
            src={user.img || DefaultProfileImage}
            alt="Profile"
            className="profile-image"
          />
          {isEditing && (
            <div className="image-upload-overlay">
              <span className="image-upload-text">Change Photo</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        <button className="edit-button" onClick={handleEdit}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={user.phone_number}
              onChange={(e) =>
                setUser({ ...user, phone_number: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={user.linkedin_link}
              onChange={(e) =>
                setUser({ ...user, linkedin_link: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              value={user.github_link}
              onChange={(e) =>
                setUser({ ...user, github_link: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              className="bio-area"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-section">
            <h2>Personal Information</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
          </div>

          <div className="info-section">
            <h2>Links</h2>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={user.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.linkedin_link}
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href={user.github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.github_link}
              </a>
            </p>
          </div>

          <div className="info-section">
            <h2>Bio</h2>
            <p>{user.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
