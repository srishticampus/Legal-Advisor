import React, { useState, useEffect, useRef } from "react"; 
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
} from "@mui/material";

import ChatBotHistory from "./ChatBotHistory";
import ChatBotLoading from "./ChatBotLoading";
import { secret_key } from "./SecretKey";

function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatHistoryRef = useRef(null);

  const genAI = new GoogleGenerativeAI(secret_key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const messageToSend = userInput;
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", message: messageToSend },
    ]);
    setUserInput(""); 

    setIsLoading(true);
    try {
      const result = await model.generateContent(messageToSend); 
      const response = await result.response;
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", message: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]); 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Card
        raised
        sx={{
          flexGrow: 1, 
          borderRadius: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column', 
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1, 
            display: 'flex',
            flexDirection: 'column', 
            p: 2,
            pb: 1, 
            minHeight: 0, 
          }}
        >
          <Box
            ref={chatHistoryRef} 
            sx={{
              flexGrow: 1, 
              overflowY: "auto", 
              pr: 1, 
              mb: 2, 
              minHeight: 0, 
            }}
          >
            <ChatBotHistory chatHistory={chatHistory} />
            <ChatBotLoading isLoading={isLoading} />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}> 
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              size="small"
              sx={{ borderRadius: 4, '& .MuiOutlinedInput-notchedOutline': { borderRadius: 4 } }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
              sx={{ borderRadius: 4 , backgroundColor:"#2A2A2A" }}
              
            >
              Send
            </Button>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            onClick={clearChat}
            fullWidth
            sx={{ mt: 1.5, borderRadius: 4 }} 
          >
            Clear Chat
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChatBot;