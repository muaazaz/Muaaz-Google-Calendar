var eventCount = 0;
var parentDiv = 0;
var arr1 = [];
var mrgTop = 0;
var mrgLeft = 0;
var start2 = 0;
var arr0 = [];
var divsArray = [];
var borderLeft = '';
var bgColor = '';

//For getting current date
export function getCurrentDate() {
  const d = new Date();
  let notime = d.toString();
  let day = notime.split(" ");
  let date = day[0] + ", " + day[1] + " " + day[2]
  return date
}


//For generating the timetable dinamically
export function createTime() {
  for (let i = 9; i <= 20; i += 0.5) {
    let cont = document.createElement("div");
    let time = document.createElement("h1");
    let min = "";
    let round = 0;
    if (Math.round(i) - i === 0.5) {
      round = Math.round(i) - 1;
      min = "30";
      if (i >= 13) {
        time.innerHTML = (round - 12).toString() + ":" + min;
      } else {
        time.innerHTML = round.toString() + ":" + min;
      }
      cont.setAttribute("class", "half");
    } else {
      min = "00";
      if (i >= 13) {
        time.innerHTML = (i - 12).toString() + ":" + min;
      } else {
        time.innerHTML = i.toString() + ":" + min;
      }

      if (i === 9 || i === 12) {
        cont.setAttribute("class", "full1");
      } else {
        cont.setAttribute("class", "full");
      }
    }
    cont.setAttribute("id", i.toString());
    cont.appendChild(time);
    if (i < 12) {
      let clckcont = document.getElementById("amclck");
      clckcont.appendChild(cont);
    } else {
      let clckcont = document.getElementById("pmclck");
      clckcont.appendChild(cont);
    }
  }
}
//For creating timely events
export function createAllDayEvent(Arr) {
   Arr && Arr.forEach((element) => {
    let alldayevnt = document.createElement("div");
    let time = document.createElement("p");
    let item = document.createElement("h1");
    let loc = document.createElement("p");


    time.setAttribute("class", "gry");
    alldayevnt.setAttribute("class", "evt");
    loc.setAttribute("class", "grn");

    loc.innerHTML = element.location;
    item.innerHTML = element.item;
    time.innerHTML = element.start + "- ";

    alldayevnt.appendChild(time);
    alldayevnt.appendChild(item);
    alldayevnt.appendChild(loc);

    let main = document.getElementById("daily");
    main.appendChild(alldayevnt);
  });
}
//Function TO generate events
function genevents(start, end, itm, loca) {
  start2 = arr0[eventCount].start
  parentDiv = document.getElementById(start)
  let evnt = document.createElement("div");
  let content = document.createElement("div");
  let time = document.createElement("p");
  let item = document.createElement("h1");
  let loc = document.createElement("p");


  evnt.setAttribute("class", "events");
  content.setAttribute("class", "content")
  time.setAttribute("class", "tim");
  item.setAttribute("class", "item");
  loc.setAttribute("class", "loc");

  if (start - 12 < 0) {
    time.innerHTML = start2.toString() + "AM-";
  } else {
    time.innerHTML = start2.toString() + "PM-";
  }

  item.innerHTML = itm;
  loc.innerHTML = loca;

  divsArray.push(evnt);

  content.appendChild(time);
  content.appendChild(item);
  content.appendChild(loc);

  evnt.appendChild(content)
  mrgTop = 0;
  mrgLeft = 0;
  overlapandStore()

  evnt.style.backgroundColor = bgColor;
  evnt.style.zIndex = "1";
  evnt.style.borderLeft = borderLeft;
  evnt.style.marginTop = mrgTop.toString() + "rem";
  evnt.style.marginLeft = mrgLeft.toString() + "rem";
  calTimeSpan(start, end, evnt);

  parentDiv.appendChild(evnt)
  return;
}

//Adjusting the height of the
function calTimeSpan(start, end, evnt) {
  let hgt = 0;
  let diff = end - start;
  if (diff === 0.5) {
    hgt = 4;
  } else {
    hgt = Math.round(diff * 4 * 2);

  }

  evnt.style.height = hgt.toString() + "rem";
}


//Checking where ovelap occurs
function overlapandStore() {
  if (eventCount === 0) {
    bgColor = '#ADD8E6'
    borderLeft = '1rem solid rgb(0, 191, 0)'
    mrgLeft = 6;
    return;
  } else {
    for (let i = eventCount; i > 0; i--) {
      if (arr1[i - 1].end - arr1[eventCount].start > 0 && !(arr1[i - 1].start === arr1[eventCount].start && arr1[i - 1].end === arr1[eventCount].end)) {
        parentDiv = divsArray[i - 1]
        bgColor = '#FFCCCB'
        borderLeft = '1rem solid red'
        mrgTop = (parseFloat(arr1[eventCount].start) - parseFloat(arr1[i - 1].start))
        if (mrgTop === 0.5) {
          mrgTop = 4;
        } else {
          mrgTop = Math.round(mrgTop * 4 * 2);
        }
        return
      } else {
        bgColor = '#ADD8E6'
        borderLeft = '1rem solid rgb(0, 191, 0)'
        mrgLeft = 0;
        return
      }
    }
  }
}

//Initialize event creation based on time zones
export function createEvents(Array) {
  console.log('Create Event caleld ..')
  eventCount = 0;
  Array && Array.forEach((element) => {
    arr0.push(element)
    let start = element.start;
    let end = element.end;
    let item = element.item;
    let loc = element.location;

    let tm1 = start.split(":");
    let tm2 = end.split(":");

    start = convert(start, tm1);
    end = convert(end, tm2);

    //Storing events in an array as an object
    let evntObj = {
      start: start,
      end: end,
      item: item,
      loc: loc,
    };
    arr1.push(evntObj);
  });
  arr1.forEach((element) => {
    genevents(element.start, element.end, element.item, element.loc);
    eventCount++;
  })
}

//To check time for am or pm and converting it in 24 hours format
function checkampm(tm) {
  switch (tm) {
    case "1":
      return (+tm + 12).toString();
    case "2":
      return (+tm + 12).toString();
    case "3":
      return (+tm + 12).toString();
    case "4":
      return (+tm + 12).toString();
    case "5":
      return (+tm + 12).toString();
    case "6":
      return (+tm + 12).toString();
    case "7":
      return (+tm + 12).toString();
    case "8":
      return (+tm + 12).toString();

    default:
      return tm;
  }
}

//Converts :30 to .5 for easier convienience in code
function checkhalf(tm) {
  if (tm !== "00") {
    return ".5";
  }
  return "";
}

//Convert fully to 24 hours format
function convert(tm, tm1) {
  tm1[0] = checkampm(tm1[0]);
  if (tm1[1]) {
    tm1[1] = checkhalf(tm1[1]);
    tm = tm1[0] + tm1[1];
    return tm;
  } else {
    tm = tm1[0];
    return tm;
  }
}