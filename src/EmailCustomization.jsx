import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const EmailCustomization = ({ template, onTemplateChange, onPromptChange, fileData }) => {
  const [customPrompt, setCustomPrompt] = useState("");

  useEffect(() => {
    onPromptChange(customPrompt); // Ensure the parent component gets the updated prompt
  }, [customPrompt, onPromptChange]);

  const handleTemplateChange = (e) => {
    onTemplateChange(e.target.value);
  };

  const handlePromptChange = (e) => {
    setCustomPrompt(e.target.value);
  };

  return (
    <div className="email-customization">
      <Form>
        <Form.Group controlId="emailTemplate">
          <Form.Label>Email Template</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={template}
            onChange={handleTemplateChange}
            placeholder="Write your email template here. Use {{name}}, {{email}} for placeholders."
            className="form-control"
          />
        </Form.Group>
        
        <Form.Group controlId="customPrompt" className="mt-3">
          <Form.Label>Custom Prompt for Personalization</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={customPrompt}
            onChange={handlePromptChange}
            placeholder="Provide a custom prompt to personalize the email content with GPT."
            className="form-control"
          />
        </Form.Group>
        
        <p>{fileData ? `${fileData.length} recipients loaded.` : 'No file loaded yet.'}</p>
      </Form>
    </div>
  );
};

export default EmailCustomization;
