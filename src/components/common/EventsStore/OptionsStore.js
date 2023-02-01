import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  option: "map",
  msgType: "option",
};

let state = initialState;

const OptionsStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      option: message.option ? message.option : state.option,
    };
    subject.next(state);
  },
  initialState,
};

export default OptionsStore;
