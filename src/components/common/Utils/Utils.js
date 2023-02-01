import {
  add,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isFuture,
  startOfToday,
} from "date-fns";

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const Utils = () => {
  const getSingleDate = (date, end) => {
    if (end) date = add(date, { days: 1 });

    let day = getDate(date);
    let month = getMonth(date) + 1;
    let year = getYear(date);
    let hours = getHours(date);
    let minutes = getMinutes(date);
    let seconds = getSeconds(date);

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  const formatDate = (date) => {
    return {
      start: getSingleDate(date.startDate, false),
      end: getSingleDate(date.endDate, true),
      endCSV: getSingleDate(date.endDate, false),
      type: "range",
      msgType: "calendar",
    };
  };

  const formatDateDisplay = (date) => {
    const start =
      months[getMonth(date.startDate)] + " " + getDate(date.startDate);
    const end = isFuture(date.endDate)
      ? months[getMonth(startOfToday())] + " " + getDate(startOfToday())
      : months[getMonth(date.endDate)] + " " + getDate(date.endDate);
    return start + " - " + end;
  };

  // From: https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
  const getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  };

  return {
    formatDate,
    formatDateDisplay,
    getScrollbarWidth,
  };
};

export default Utils;
