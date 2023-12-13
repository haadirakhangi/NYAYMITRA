import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

import {
  useChatInteract,
  useChatMessages,
  IMessage,
} from "@chainlit/react-client";
import { useChatSession } from "@chainlit/react-client";
import { useState } from "react";
const CHAINLIT_SERVER = "http://localhost:8000";
const userEnv = {};

export function Playground() {
  const { connect } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  useEffect(() => {
    connect({ wsEndpoint: CHAINLIT_SERVER, userEnv });
  }, [connect]);
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
    console.log("Text sended to me",message.content)
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
          <Button onClick={handleSendMessage} type="submit">
            Record Voice
          </Button>
        </div>
      </div>
    </div>
  );
}
