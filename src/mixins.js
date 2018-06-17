import moment from 'moment'

export const DateMixin = {
  filters: {
    formatDate (str, outputFormat = 'DD.MM.YYYY HH:mm:ss') {
      return moment(str).format(outputFormat)
    },

    diffForHumans (str) {
      return moment(str).from(moment());
    }
  }
}