import React from 'react';

function Dashboard({ role }) {
  return (
    <div className="dashboard">
      <h2>Welcome, {role}!</h2>
      <p>This is your dashboard for managing waste automation.</p>
    </div>
  );
}

export default Dashboard;