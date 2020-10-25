import Vue from "vue";
import moment from "moment";
function formatDate(date,format = "YYYY-MM-DD"){
      return moment(date).format(format)
}

Vue.filter('formatDate', formatDate)
