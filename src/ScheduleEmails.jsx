import React, { useState } from 'react';
import axios from 'axios';
import './ScheduleEmails.css'; // Ensure you have this CSS file for additional styling

const ScheduleEmails = ({ fileData, emailTemplate, customPrompt, emailAccount, onStatusUpdate }) => {
  const [scheduleTime, setScheduleTime] = useState("");

  const handleSendEmails = async () => {
    if (!emailAccount) {
      alert("Please connect an email account before sending emails.");
      return;
    }

    if (!fileData || fileData.length === 0) {
      alert("Please upload a CSV or Google Sheet with recipient data.");
      return;
    }

    try {
      const response = await axios.post('/api/generate-and-send-emails', {
        fileData,
        emailTemplate,
        customPrompt,  // Include custom prompt in the request
        scheduleTime,
        emailAccount  // Pass connected email account
      });
      onStatusUpdate(response.data.statuses);  // Update with email statuses
    } catch (error) {
      console.error("Error sending emails", error);
    }
  };

  return (
    <div className="schedule-emails">
      <h3 className="animated-title">Schedule Emails</h3>
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) => setScheduleTime(e.target.value)}
        className="animated-input"
      />
      <button className="animated-button" onClick={handleSendEmails}>Send Emails</button>
    </div>
  );
};

export default ScheduleEmails;
