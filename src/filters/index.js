
let timeDistanceNow = (date) => {
  let dateTime = new Date(date).getTime();
  let currentTime = new Date().getTime(); 
  let distanceTime = currentTime - dateTime;
  let yearOfMillisecond = 365 * 24 * 60 * 60 * 1000;
  let dayOfMillisecond = 24 * 60 * 60 * 1000;
  let hourOfMillisecond = 60 * 60 * 1000;
  let minuteOfMillisecond = 60 * 1000; 
  if(distanceTime >= yearOfMillisecond) {
    let distanceYear = Math.floor(distanceTime / yearOfMillisecond);
    return `${distanceYear}年前`
  } else if(distanceTime >= dayOfMillisecond) {
    let distanceDay = Math.floor(distanceTime / dayOfMillisecond);
    return `${distanceDay}天前`
  } else if(distanceTime >= hourOfMillisecond) {
    let distanceHour = Math.floor(distanceTime / hourOfMillisecond);
    return `${distanceHour}小时前`  
  } else if(distanceTime >= minuteOfMillisecond) {
    let distanceMinute = Math.floor(distanceTime / minuteOfMillisecond);
    return `${distanceMinute}分钟前`  
  } else {
    return '刚刚'
  }
}

let strToChinese = (str) => {
  switch(str) {
    case 'share':
      return '分享'
    case 'ask':
      return '问答'
    case 'job':
      return '招聘'
    case 'dev':
      return '测试'
    case 'good':
      return '精华'
    case 'top':
      return '置顶'
    default:
      return ''
  }
}



export { timeDistanceNow, strToChinese }