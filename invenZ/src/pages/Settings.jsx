import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './Settings.css';

const Settings = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const { success, error } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(profileData);
      success('Profile updated successfully!');
    } catch (err) {
      error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      error('New passwords do not match');
      return;
    }
    try {
      setLoading(true);
      await changePassword(passwordData.current, passwordData.new);
      success('Password changed successfully!');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (err) {
      error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button 
            className={`settings-tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            🔐 Password
          </button>
          <button 
            className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            🎨 Preferences
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>👤 Profile Settings</h2>
              <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="settings-section">
              <h2>🔐 Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    required
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2>🎨 Preferences</h2>
              <div className="preference-item">
                <label>Theme</label>
                <select>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div className="preference-item">
                <label>Language</label>
                <select>
                  <option value="en">English</option>
                  <option value="si">සිංහල</option>
                  <option value="ta">தமிழ்</option>
                </select>
              </div>
              <div className="preference-item">
                <label>Notifications</label>
                <div className="toggle-group">
                  <label>
                    <input type="checkbox" defaultChecked /> Email Notifications
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> Low Stock Alerts
                  </label>
                </div>
              </div>
              <button className="btn-primary">Save Preferences</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;