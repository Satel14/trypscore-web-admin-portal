import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  msgType: "alert",
  audience: "dashboard",
};

let state = initialState;

const AlertStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      msg: message.msg ? message.msg : state.msg,
      type: message.type ? message.type : state.type,
      audience: message.audience ? message.audience : state.audience,
    };
    subject.next(state);
  },
  initialState,
};

export default AlertStore;
