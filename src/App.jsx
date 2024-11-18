import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';
import FileUpload from './FileUpload';
import EmailCustomization from './EmailCustomization';
import EmailStatus from './EmailStatus';
import ScheduleEmails from './ScheduleEmails';
import ConnectEmailAccount from './ConnectEmailAccount';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary
import './App.css';

const App = () => {
  const [fileData, setFileData] = useState(null);
  const [emailTemplate, setEmailTemplate] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");  
  const [statusData, setStatusData] = useState([]);
  const [emailAccount, setEmailAccount] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (data) => setFileData(data);
  const handleTemplateChange = (template) => setEmailTemplate(template);
  const handlePromptChange = (prompt) => setCustomPrompt(prompt);  
  const handleStatusUpdate = (status) => setStatusData(status);
  const handleEmailAccountConnected = (account) => setEmailAccount(account);
  const handleProgressUpdate = (percent) => setProgress(percent);

  return (
    <ErrorBoundary>
      <Container fluid className="p-5 app-container">
        <h1 className="text-center mb-5 animated-title">Custom Email-Sending Application</h1>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm animated-card">
              <Card.Body>
                <h5 className="card-title">Step 1: Connect Email Account</h5>
                <ConnectEmailAccount onEmailAccountConnected={handleEmailAccountConnected} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm animated-card">
              <Card.Body>
                <h5 className="card-title">Step 2: Upload Recipient Data</h5>
                <FileUpload onFileUpload={handleFileUpload} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm animated-card">
              <Card.Body>
                <h5 className="card-title">Step 3: Customize Email</h5>
                <EmailCustomization 
                  template={emailTemplate} 
                  onTemplateChange={handleTemplateChange} 
                  onPromptChange={handlePromptChange} 
                  fileData={fileData} 
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={8}>
            <Card className="shadow-sm animated-card">
              <Card.Body>
                <h5 className="card-title">Real-time Status</h5>
                {statusData.length > 0 ? (
                  <EmailStatus statusData={statusData} />
                ) : (
                  <Alert variant="info">No emails sent yet. Upload data and schedule emails.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm animated-card">
              <Card.Body>
                <h5 className="card-title">Step 4: Schedule & Send Emails</h5>
                <ScheduleEmails 
                  fileData={fileData} 
                  emailTemplate={emailTemplate} 
                  customPrompt={customPrompt} 
                  emailAccount={emailAccount}  
                  onStatusUpdate={handleStatusUpdate} 
                />
                <ProgressBar now={progress} label={`${progress}%`} className="mt-3 progress-bar" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
};

export default App;
