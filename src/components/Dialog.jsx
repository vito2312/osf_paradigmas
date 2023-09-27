import React from 'react';

const Dialog = ({ data, onClose }) => {
  return (
    <div className="dialog">
      <div className="dialog-content">
        <h2>About Us</h2>
        <ul>
          <li>Team Members:</li>
          <ul>
            {data.teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <li>Course: {data.course}</li>
          <li>Project: {data.project}</li>
          <li>Semester: {data.semester}</li>
          <li>Year: {data.year}</li>
          <li>School: {data.school}</li>
          <li>University: {data.university}</li>
        </ul>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Dialog;
