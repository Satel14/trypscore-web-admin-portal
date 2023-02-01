import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  csvd: [],
  csvh: [
    { label: "Event Type", key: "eventType" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Condition", key: "condition" },
    { label: "Speed", key: "speed" },
    { label: "Severity", key: "severity" },
    { label: "Postal Code", key: "postalCode" },
  ],
  total: 0,
};

let state = initialState;

const DataStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      csvd: message.csvd || state.csvd,
      csvh: state.csvh,
      total: message.total === undefined ? state.total : message.total,
    };
    subject.next(state);
  },
  initialState,
};

export default DataStore;
