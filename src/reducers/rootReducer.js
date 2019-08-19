import { combineReducers } from "redux";
import meetingsReducer from "./meetings";
import messagingReducer from "./meetings";
import authReducer from "./auth";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  //  Every reducer imported gets listed here!!
  meetings: meetingsReducer,
  messages: messagingReducer,
  auth: authReducer,
  firebase: firebaseReducer, //handles auth syncing
  firestore: firestoreReducer //has all the data =D
});

export default rootReducer;
