import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import {
  useChatInteract,
  useChatMessages,
  IMessage,
} from "@chainlit/react-client";
import { useChatSession } from "@chainlit/react-client";
import { useState } from "react";
const CHAINLIT_SERVER = "http://localhost:8000";
const userEnv = {};

export function DocumentSummarization() {
  const [isDocUploaded, setIsDocUploaded] = useState(false);
  const { connect } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  useEffect(() => {
      connect({ wsEndpoint: CHAINLIT_SERVER, userEnv });
  }, [connect]);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files); // Convert the FileList to an array
    // console.log("info of file",e.target.files[0])
    // const formData = new FormData();
    // const fileElements = files.map((file) => ({
    //   name: file.name,
    //   type: file.type,
    //   size: 10,
    //   lastModified: file.lastModified,
    //   content: file,
    // }));
    // const fileElements =[{
    //   name: e.target.files[0].name,
    //   type: e.target.files[0].type,
    //   size: 'small',
    //   content: e.target.files[0],
    // }]
    // const message = {
    //   id: uuidv4(),
    //   author: "user",
    //   content: "file sended",
    //   authorIsUser: true,
    //   createdAt: new Date().toISOString(),
    // };
    // sendMessage(message, fileElements);
    // setIsDocUploaded(true);
    // Append each file to the FormData
    files.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/user/document-summarization", formData);
      console.log('Documents sent successfully', response.data);
      if (response.data.response) {
        setIsDocUploaded(true);
      }
    } catch (error) {
      console.log('Error sending documents to server:', error);
    }
  };



  const startRecording = async () => {
    try {
      // Access user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

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
          const response = await axios.post("http://127.0.0.1:5000/user/voice-chat", formData);
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
    // Stop recording
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }

    // Stop the microphone stream
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => stream.getTracks().forEach((track) => track.stop()));
  };

  const handleRecordClick = () => {
    if (isRecording) {
      // If already recording, stop recording
      setIsRecording(false);
      stopRecording();
    } else {
      // If not recording, start recording
      setIsRecording(true);
      startRecording();
    }
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
        {!isDocUploaded && (
          <div>
            <Input type="file" multiple id="file-input" onChange={(e) => handleFileUpload(e)} />
            <p>Please upload a document to start the chat</p>
          </div>
        )}
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
            {isRecording ? <MicOffIcon /> : <MicIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
}
