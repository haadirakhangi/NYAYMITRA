import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";

import {
  useChatInteract,
  useChatMessages,
  IMessage,
} from "@chainlit/react-client";
import { useChatSession } from "@chainlit/react-client";
import { useState } from "react";
const CHAINLIT_SERVER = "http://localhost:8000";
const userEnv = {};

const recordAndSendVoice = async () => {
  try {
    // Access user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Use MediaRecorder to record voice
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    let resolvePromise; // This will be used to resolve the promise when needed
    const voicePromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      // Combine recorded audio chunks into a single Blob
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

      // Send the Blob to Flask API using fetch
      const formData = new FormData();
      formData.append('voice', audioBlob, 'voice.wav');

      try {
        const response = await axios.post("http://127.0.0.1:5000/user/voice-chat", formData);
        console.log('Voice sent successfully', response.data);

        // Resolve the promise with the response
        resolvePromise(response.data.message);
      } catch (error) {
        console.error('Error sending voice to Flask API:', error);
        // Reject the promise if there is an error
        resolvePromise(null);
      }
    };

    // Start recording
    mediaRecorder.start();

    // Record for 5 seconds (you can adjust the duration)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Stop recording
    mediaRecorder.stop();

    // Stop the microphone stream
    stream.getTracks().forEach((track) => track.stop());

    // Return the promise that resolves with the response
    return voicePromise;
  } catch (error) {
    console.error('Error recording and sending voice:', error);
    return null;
  }
};


export function Playground() {
  const { connect } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  useEffect(() => {
    connect({ wsEndpoint: CHAINLIT_SERVER, userEnv });
  }, [connect]);

  const handleRecordClick = () => {
    // Call the function to record and send voice
    recordAndSendVoice().then((response) => {
      if (response) {
        // Handle the response here
        setInputValue(response)
        console.log('Response from Flask API:', response);
        handleSendMessage()
      } else {
        console.error('Failed to get a response from Flask API.');
      }
    });
  };

  const handleSendMessage = () => {
    const content = inputValue.trim();
    if (content) {
      const message = {
        id: uuidv4(),
        author: "user",
        content: content,
        authorIsUser: true,
        createdAt: new Date().toISOString(),
      };
      sendMessage(message, []);
      setInputValue("");
    }
  };

  const renderMessage = (message: IMessage) => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    console.log("Text sended to me", message.content)
    let contentWithBreaks = message.content.replace(/\n/g, '<br>');
    contentWithBreaks = contentWithBreaks.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const contentWithHTML = { __html: contentWithBreaks };

    const date = new Date(message.createdAt).toLocaleTimeString(
      undefined,
      dateOptions
    );
    return (
      <div key={message.id} className="flex items-start space-x-2">
        <div className="w-20 text-sm text-red-500">{message.author}</div>
        <div className="flex-1 border rounded-lg p-2">
          <div
            className="text-black dark:text-white"
            dangerouslySetInnerHTML={contentWithHTML} // Render HTML content
          />
          <small className="text-xs text-gray-500">{date}</small>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {messages.map((message) => renderMessage(message))}
        </div>
      </div>
      <div className="border-t p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Input
            autoFocus
            className="flex-1"
            id="message-input"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} type="submit">
            Send
          </Button>
          <Button onClick={handleRecordClick}>
            Record Voice
          </Button>
        </div>
      </div>
    </div>
  );
}
