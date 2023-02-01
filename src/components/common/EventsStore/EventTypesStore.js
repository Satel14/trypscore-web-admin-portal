import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  types: ["ACCEL", "BRAKE", "LEFT", "RIGHT", "PHONE", "SPEED"],
  msgType: "event_types",
};

let state = initialState;

const EventTypesStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      types: message.types || state.types,
    };
    subject.next(state);
  },
  initialState,
};

export default EventTypesStore;
