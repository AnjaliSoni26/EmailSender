import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './FileUpload.css'; // Ensure you have this CSS file for additional styling

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const parsedData = parseCSV(data); // Your custom logic to parse CSV
        onFileUpload(parsedData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="file-upload">
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload CSV or Google Sheet</Form.Label>
          <Form.Control 
            type="file"
            accept=".csv, .xlsx" 
            onChange={handleFileChange}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" className="mt-3" onClick={() => document.getElementById('formFile').click()}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload;
