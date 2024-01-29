const moment = require("moment")
module.exports = {
  handleDate: (time) => {
    const specificTime = moment(time, "YYYY-MM-DD HH:mm:ss.SSZ")
    const currentTime = moment()
    const num = currentTime.diff(specificTime, "minutes")
    let diff = num + " phút trước"
    if (num > 60) {
      const num2 = currentTime.diff(specificTime, "hours")
      let diff2 = num2 + " giờ trước"
      if (num2 > 24) {
        diff2 = currentTime.diff(specificTime, "days") + " ngày trước"
      }
      return diff2
    }
    return diff
  },
}
