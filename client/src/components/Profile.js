import React, { useState } from 'react';
// import userImage from '../../assets/user.jpg';
import PageTitle from '../help/PageTitle';
import './profilepage.css'; // Import custom CSS file

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Student',
    additional_detiles: 'Student of Information Technology department.',
    skills: ['JavaScript', 'React', 'Node.js'],
    location: 'City, Country',
    class: 'Information Technology',
    certification: 'Certified React Developer',
  });
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewProfilePhoto(e.target.files[0]);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Add logic to update profile details and photo (API call or state update)
    setEditMode(false);
    setNewProfilePhoto(null);
  };

  return (
    <div className="profile-container">
      <div className="d-flex justify-content-between">
        <PageTitle title={'Profile'} />
        <button
          className="edit-profile-btn mt-3"
          onClick={handleEditToggle}
        >
          <i className="bi bi-pencil-square me-2"></i>
          Edit Profile
        </button>
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="profile-image-container">
            <img
              src={newProfilePhoto ? URL.createObjectURL(newProfilePhoto) : process.env.PUBLIC_URL + 'images/logo.jpg'}
              alt="Profile"
              className="profile-image"
            />
            {editMode && (
              <div className="mt-3">
                <label htmlFor="profile-photo" className="form-label">Update Profile Photo</label>
                <input
                  type="file"
                  id="profile-photo"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8 mb-4">
          <div className="profile-card">
            <div className="profile-card-body">
              {editMode ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="additional-details">Additional Details</label>
                    <textarea
                      id="additional-details"
                      name="additional_detiles"
                      rows={3}
                      value={formData.additional_detiles}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-2 me-2">
                    <i className="bi bi-check-circle m-2"></i>
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary mt-2" onClick={handleEditToggle}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h5 className="profile-card-title">
                    <i className="bi bi-person-circle me-2"></i>
                    {formData.username}
                  </h5>
                  <p className="profile-card-text">
                    <i className="bi bi-envelope me-2"></i>
                    {formData.email}
                  </p>
                  <p className="profile-card-text">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    {formData.role}
                  </p>
                  <p className="profile-card-text">
                    <i className="bi bi-geo-alt me-2"></i>
                    {formData.location}
                  </p>
                  <ul className="list-group mb-4">
                    <li className="list-group-item">
                      <strong>Class:</strong> {formData.class}
                    </li>
                    <li className="list-group-item">
                      <strong>Certification:</strong> {formData.certification}
                    </li>
                    <li className="list-group-item">
                      <strong>Additional Details:</strong> {formData.additional_detiles}
                    </li>
                  </ul>
                  <p className="profile-card-text">
                    <strong>Skills:</strong> {formData.skills.join(', ')}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
