import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  type: "driving_by",
  msgType: "fence",
};

let state = initialState;

const FenceTypeStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      type: message.type ? message.type : state.type,
    };
    subject.next(state);
  },
  initialState,
};

export default FenceTypeStore;
