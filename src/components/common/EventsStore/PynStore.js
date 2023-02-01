import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  id: "",
  msgType: "pyn",
};

let state = initialState;

const PynStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      id: message.id ? message.id : state.id,
    };
    subject.next(state);
  },
  initialState,
};

export default PynStore;
