import { useAuth } from "../components/AuthContext";
function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-info">
        <div className="info-section">
          <h2>Personal Information</h2>
          <p>
            <strong>Username:</strong> {user?.name}
          </p>
          <p>
            <strong>First Name:</strong> {user?.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phoneNumber}
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            {user?.gitHubUrl ? (
              <a
                href={user.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.gitHubUrl}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            {user?.linkedinUrl ? (
              <a
                href={user.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.linkedinUrl}
              </a>
            ) : (
              "Not provided"
            )}
          </p>
          <p>
            <strong>Bio:</strong> {user?.bio || "No bio provided"}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Profile;
