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

const ChatWidget: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSendMessage = async () => {
    let newChatHistory = [];
    let userdata = ""
    newChatHistory = [...chatHistory, { role: "user", message: userMessage }];
    setChatHistory(newChatHistory);
    userdata = userMessage
    setLoading(true);

    try {
      // Send userMessage to your chatbot backend and handle the response
      const response = await fetch("/api/user/chatbot-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userdata }),
      });

      const data = await response.json();

      const chatbotResponse = data.chatbotResponse;
      const newChatHistoryWithResponse = [...newChatHistory, { role: "chatbot", message: chatbotResponse }];
      setChatHistory(newChatHistoryWithResponse);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    // Clear the input field
    setUserMessage("");
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

export default ChatWidget;
