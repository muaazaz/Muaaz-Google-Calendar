//For getting current date
export function getCurrentDate() {
  const d = new Date();
  let notime = d.toString();
  let day = notime.split(" ");
  let date = day[0] + ", " + day[1] + " " + day[2]
  return date
}

//Checking where ovelap occurs
// function overlapandStore() {
//   if (eventCount === 0) {
//     bgColor = '#ADD8E6'
//     borderLeft = '1rem solid rgb(0, 191, 0)'
//     mrgLeft = 6;
//     return;
//   } else {
//     for (let i = eventCount; i > 0; i--) {
//       if (arr1[i - 1].end - arr1[eventCount].start > 0 && !(arr1[i - 1].start === arr1[eventCount].start && arr1[i - 1].end === arr1[eventCount].end)) {
//         parentDiv = divsArray[i - 1]
//         bgColor = '#FFCCCB'
//         borderLeft = '1rem solid red'
//         mrgTop = (parseFloat(arr1[eventCount].start) - parseFloat(arr1[i - 1].start))
//         if (mrgTop === 0.5) {
//           mrgTop = 4;
//         } else {
//           mrgTop = Math.round(mrgTop * 4 * 2);
//         }
//         return
//       } else {
//         bgColor = '#ADD8E6'
//         borderLeft = '1rem solid rgb(0, 191, 0)'
//         mrgLeft = 0;
//         return
//       }
//     }
//   }
// }
