import { combineReducers } from "redux";
import authreducer from "./authreducer";
import chatIdsReducer from "./chatIdreducer";
import selectedchatidreducer from "./selectedchatidreducer";
import chatListreducer from "./chatListreducer";
import messagesReducer from "./messagereducer";

const rootReducer = combineReducers({
  auth: authreducer,
  chatIds: chatIdsReducer,
  selectedChatId: selectedchatidreducer,
  chatList: chatListreducer,
  messages: messagesReducer,
  // Other reducers if needed
});

export default rootReducer;
