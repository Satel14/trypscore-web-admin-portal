import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  updated: "false",
  msgType: "user",
};

let state = initialState;

const UserStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      updated: message.updated ? message.updated : state.updated,
    };
    subject.next(state);
  },
  initialState,
};

export default UserStore;
