import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  layer: "clusters",
  msgType: "layertoggle",
};

let state = initialState;

const ToggleStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      layer: message.layer ? message.layer : state.layer,
    };
    subject.next(state);
  },
  initialState,
};

export default ToggleStore;
