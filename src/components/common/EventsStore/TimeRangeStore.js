import { Subject } from "rxjs";
import { addDays, subDays } from "date-fns";

const subject = new Subject();

const initialState = {
  startDate: subDays(new Date(), 7),
  endDate: addDays(new Date(), 1),
  key: "selection",
};

let state = initialState;

const TimeRangeStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      startDate: message.startDate || state.startDate,
      endDate: message.endDate || state.endDate,
    };
    subject.next(state);
  },
  initialState,
};

export default TimeRangeStore;
