import React, { useEffect, useRef, useState } from "react";
import { fakeMessages } from "./fakeMessages";

const AiChatPopup = ({ onClose }) => {
  const [aiMessages, setAiMessages] = useState(fakeMessages);
  const [aiInput, setAiInput] = useState("");
  const aiEndRef = useRef(null);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  const sendMessage = () => {
    if (!aiInput.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: aiInput,
    };

    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: "This is a fake AI reply 🤖",
    };

    setAiMessages((prev) => [...prev, userMsg, botMsg]);
    setAiInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="ai-chat-popup">
      <div className="ai-chat-header">
        <span>AI Assistant</span>
        <button className="ai-chat-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="ai-chat-body">
        {aiMessages.map((msg) => (
          <div
            key={msg.id}
            className={`ai-chat-msg ${
              msg.sender === "user" ? "ai-user" : "ai-bot"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={aiEndRef} />
      </div>

      <div className="ai-chat-input-area">
        <input
          className="ai-chat-input"
          type="text"
          placeholder="Type your message..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="ai-chat-send" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default AiChatPopup;
