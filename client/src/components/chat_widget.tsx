import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faTimes,
  faPaperPlane,
  faMicrophone,
  faMicrophoneAltSlash,
} from '@fortawesome/free-solid-svg-icons';

import './chat_widget.css'; // Import your styles

const App: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSendMessage = () => {
    // Add logic to send user message and receive a chatbot response
    // Update chatHistory and setLoading accordingly
  };

  const handleStartVoiceInput = () => {
    // Add logic to start voice input
    // Update setListening accordingly
  };

  const handleStopVoiceInput = () => {
    // Add logic to stop voice input
    // Update setListening accordingly
  };

  return (
    <div>
      <div className="floating-chatbot-button" onClick={() => setShowChatbot(!showChatbot)}>
        <FontAwesomeIcon icon={faRobot} />
      </div>
      {showChatbot && (
        <div className="chatbot-interface">
          <button className="close-button" onClick={() => setShowChatbot(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="chat-history">
            {chatHistory.map((item, index) => (
              <div key={index} className={`message ${item.role}`}>
                {item.role === 'user' ? (
                  <div>
                    <strong>User:</strong> {item.message}
                  </div>
                ) : (
                  <div>
                    <strong>Chatbot:</strong> {item.message}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="loading-dots">Loading...</div>}
          </div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} style={{ marginRight: '10px' }}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <button onClick={handleStartVoiceInput}>
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
            {listening && (
              <button onClick={handleStopVoiceInput} style={{ marginLeft: '10px' }}>
                <FontAwesomeIcon icon={faMicrophoneAltSlash} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
