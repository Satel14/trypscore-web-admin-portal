import { Subject } from "rxjs";
const subject = new Subject();

const initialState = {
  name: "",
  id: "",
  iconUrl: "",
  msgType: "company",
  country: "",
};

let state = initialState;

const CompaniesStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      name: message.name,
      id: message.id,
      iconUrl: message.iconUrl,
      country: message.country,
    };
    subject.next(state);
  },
  initialState,
};

export default CompaniesStore;
