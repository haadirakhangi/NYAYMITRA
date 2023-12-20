import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  useChatInteract,
  useChatMessages,
  IMessage,
} from "@chainlit/react-client";
import { useChatSession } from "@chainlit/react-client";
import { useState } from "react";
const CHAINLIT_SERVER = "http://localhost:8002";
const userEnv = {};

export function Lawbot() {
  const handleDefaultQuestionClick = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  const renderDefaultQuestions = () => {
    return (
      <div className="flex flex-wrap space-x-2">
        {defaultQuestions.map((question, index) => (
          <Button
            key={index}
            onClick={() => handleDefaultQuestionClick(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    );
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const { connect } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  useEffect(() => {
    connect({ wsEndpoint: CHAINLIT_SERVER, userEnv });
  }, [connect]);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      stopRecording();
    };
  }, []);
  const startRecording = async () => {
    try {
      // Access user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("i am recording")
      // Use MediaRecorder to record voice
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Combine recorded audio chunks into a single Blob
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

        // Send the Blob to Flask API using fetch
        const formData = new FormData();
        formData.append('voice', audioBlob, 'voice.wav');

        try {
          console.log("Sended the voice op")
          const response = await axios.post("/api/user/voice-chat", formData);
          console.log('Voice sent successfully', response.data);

          // Resolve the promise with the response
          setInputValue(response.data.message);
          handleSendMessage();
        } catch (error) {
          console.error('Error sending voice to Flask API:', error);
          // Reject the promise if there is an error
        }
      };

      // Start recording
      recorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    // Stop the MediaRecorder
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null); // Clear the mediaRecorder state
    }
  
    // Reset the microphone stream
    const stream = mediaRecorder?.stream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setMediaRecorder(null);
    }
  
    console.log('Recording stopped');
  };
  
  const handleRecordClick = async () => {
    if (isRecording) {
      // If already recording, stop recording
      setIsRecording(false);
      stopRecording();
    } else {
      // If not recording, start recording
      setIsRecording(true);
      await startRecording();
    }
  };
  
  const defaultQuestions = [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Why do you want to work for this company?",
    // Add more default questions as needed
  ];

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
        <div className="flex-1">
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
    <div style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with the actual path to your image
      backgroundSize: 'cover', // Adjust as needed
      // backgroundPosition: 'center', // Adjust as needed
      height: "100vh",
    }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Languages</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Languages"
            onChange={handleChange}
          >
            <MenuItem value="English">
              <em>English</em>
            </MenuItem>
            <MenuItem value={'Hindi'}>Hindi</MenuItem>
            <MenuItem value={'Marathi'}>Marathi</MenuItem>
            <MenuItem value={'Gujrati'}>Gujrati</MenuItem>
          </Select>
          <FormHelperText>Select Language of Response</FormHelperText>
        </FormControl>
      </div>
      <div className="flex-1 overflow-auto mt-32 pl-28 pr-28">
        <div className="space-y-4 bg-[#eeeeee] bg-opacity-70 p-2 border rounded-lg">
          <div className="space-y-4 p-2">
            {renderDefaultQuestions()}

          </div>
          {messages.map((message) => renderMessage(message))}

        </div>

      </div>
      <div className="border-t p-4 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Input
            autoFocus
            className="flex-1"
            id="message-input "
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
            {isRecording ? <MicOffIcon /> : <MicIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
}
