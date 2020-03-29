import * as dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import LocaleData from 'dayjs/plugin/localeData'

export default {
  get (component, startTime, endTime, chart, reverse) {
    const config = component.config || {}
    let axis = Object.assign({}, config)
    axis.type = 'category'
    dayjs.extend(LocalizedFormat)
    dayjs.extend(LocaleData)
    switch (config.dayFormat) {
      case 'short':
        axis.data = dayjs.localeData().weekdaysShort()
        break
      case 'min':
        axis.data = dayjs.localeData().weekdaysMin()
        break
      default:
        axis.data = dayjs.localeData().weekdays()
        break
    }

    if (!config.startOnSunday) {
      axis.data.push(axis.data.shift())
    }
    if (reverse) axis.data.reverse()

    return axis
  }
}
