//To change start time from decimals/24 hours format to standard time format
export const calculateStart = (event) => {
  let start = "",
    zone = "";
  let split = event.start.toString().split(".");
  if (split[0] >= 12) {
    zone = "PM";
  } else {
    zone = "AM";
  }
  if (split[1]) {
    start = split[0] + ":30" + zone;
  } else {
    start = split[0] + ":00" + zone;
  }
  return start;
};
//To calculate height of event according to the time it will last
export const calculateHeight = (event) => {
  let height = "0",
    halfHeight =
      Math.round(event.end - event.start) - (event.end - event.start) === 0.5 ? 1 : 0;
    height = ((parseInt(event.end - event.start) * 2 + halfHeight) * 4).toString() + "rem";
    return height;
};
//To calculate margin for child events to position them correctly
export const calculateMargin = (event, childEvent) => {
  let marginTop = "0",
    halfDiff =
      Math.round(event.start - childEvent.start) -
        (event.start - childEvent.start) === 0.5 ? 1 : 0;
    marginTop = ((parseInt(Math.abs(event.start - childEvent.start)) * 2 + halfDiff) * 4).toString() + "rem";
    return marginTop;
};
//To add events that are child in child array to stop re rendering those events
export let childArray = [];
export const checkChild = (event, compareArray) => {
  let eventChilds = []
  for (let i = 0; i < compareArray.length; i++) {
    if (
      (event.end - compareArray[i].start >= 0 &&
      (event.start !== compareArray[i].start &&
      event.end !== compareArray[i].end))
    ){
      childArray.push(compareArray[i]._id);
      eventChilds.push(compareArray[i])
    }
  }
  return eventChilds
};
//To disable select options for end time that are equals or lesser than start time
export const disableEndTimeArray = (time)=>{
  let timeCheckArray = []
  for(let i = 9; i<=time; i+=0.5){
    timeCheckArray.push(i);
  }
  return timeCheckArray
}