import { Container, Nav, Image, Col, Row } from "react-bootstrap";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setChatIds } from "../statemanagement/chatIdreducer";
import axios from "axios";
import { setChatList } from "../statemanagement/chatListreducer";
import { useEffect } from "react";
import { resetMessages, setMessages } from "../statemanagement/messagereducer";
import chat from "../../assets/chat.png";
const Sidebar = (props) => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chatList);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/home";
    }, 1000);
  };

  const handleSelectedNewChatClick = (id) => {
    dispatch(resetMessages());
    const chatId = id.chatId;
    dispatch(setChatIds(chatId));
  };

  const handleNewChatClick = () => {
    dispatch(resetMessages());
    const initialChatbotMessage = {
      content: "Hello, how can I assist you?",
      sender: "chatbot",
    };
    dispatch(setMessages([initialChatbotMessage]));
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("http://localhost:8000/api/add/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const chatId = response.data.chatId;
        dispatch(setChatIds(chatId));

        if (response.data.chatId) {
          axios
            .get(`http://localhost:8000/api/chatlist/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              const chatList = response.data.chats;
              dispatch(setChatList(chatList));
            })
            .catch((error) => {
              console.error("Error fetching chat details:", error);
            });
        } else {
          console.error("No chatId found in the response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    const fetchChatList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/chatlist/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const chatList = response.data.chats;
        dispatch(setChatList(chatList));
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, [accessToken, dispatch]);

  return (
    <Container className="sidebar-box">
      <div className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/chat/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/chat/profile">Profile</Nav.Link>
          <Nav.Link href="/contact">Settings</Nav.Link>
          <Nav.Link href="" className="logout" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </div>
      <div className="newchat">
        <div className="newchat-button" onClick={handleNewChatClick}>
          <div className="newchat-text">+ New Chat</div>
        </div>
        <div className="chat-list">
          {chatList ? (
            (() => {
              const chatButtons = [];

              for (let i = 0; i < chatList.length; i++) {
                chatButtons.push(
                  <div
                    key={chatList[i]}
                    className="newchat-button"
                    onClick={() => handleSelectedNewChatClick(chatList[i])}
                  >
                    <Row className="chat-row">
                      <div className="chat-div">
                        <Col xs={4} className="button-column">
                          <Image
                            className="button-chat-icon"
                            src={chat}
                            fluid
                          />
                        </Col>
                        <Col xs={10}>
                          <p>Chat {i + 1}</p>
                        </Col>
                      </div>
                    </Row>
                  </div>
                );
              }
              return chatButtons;
            })()
          ) : (
            <div className="no-chat-text">No chat list available</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
