import React, { useState, useEffect, useRef } from "react";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import "./chatscreen.css"; // Import the CSS file
import chaticon from "../../assets/chaticon.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setMessages,
  appendMessage,
  resetMessages,
} from "../../components/statemanagement/messagereducer";

const ChatScreen = () => {
  const [inputText, setInputText] = useState("");
  const messages = useSelector((state) => state.messages);

  const dispatch = useDispatch();
  const chatIds = useSelector((state) => state.chatIds);

  const isFirstRender = useRef(true);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const userMessage = { content: inputText, sender: "user" };
    dispatch(appendMessage([userMessage]));
    setInputText("");
    const accessToken = localStorage.getItem("access_token");
    const endpointUrl = `http://localhost:8000/api/chat/${chatIds}`;
    axios
      .post(
        endpointUrl,
        {
          query: inputText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const chatbot_response = response.data.chatbotResponse;
        const newBotMessage = { content: chatbot_response, sender: "chatbot" };
        dispatch(appendMessage([newBotMessage]));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const fetchChatHistory = async () => {
      try {
        const endpointUrl = `http://localhost:8000/api/chat/${chatIds}`;
        const response = await axios.post(
          endpointUrl,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const chatHistory = response.data.history;
        const messages = chatHistory
          .map((entry) => {
            if (entry.type === 1) {
              return { content: entry.text, sender: "chatbot" };
            } else if (entry.type === 0) {
              return { content: entry.text, sender: "user" };
            }
            return null;
          })
          .filter((text) => text !== null);

        dispatch(setMessages(messages));
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [chatIds, dispatch]);

  return (
    <Container className="chat-outer-box">
      <Row>
        <Col>
          <span className="dashboard-text">Dashboard</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="grey-screen">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user" : "chatbot"
                }`}
              >
                <div className="message-content">{message.content}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="outer-text-field">
        <div className="grey-type-field">
          <Col xs={11}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
            />
          </Col>
          <Col xs={1} className="button-column">
            <Button
              variant="primary"
              className="send-button"
              onClick={handleSendMessage}
            >
              <Image className="button-icon" src={chaticon} fluid />
            </Button>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default ChatScreen;
