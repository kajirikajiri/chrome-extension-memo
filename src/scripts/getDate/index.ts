export const getDate =()=> {
  var dt = new Date();
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var date = dt.getDate();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();
  var ymdhms = new String(year) + "/" + ("00" + new String(month)).slice(-2) + "/" + ("00" + new String(date)).slice(-2);
  ymdhms += " " + ("00" + new String(hours)).slice(-2) + ":" + ("00" + new String(minutes)).slice(-2) + ":" + ("00" + new String(seconds)).slice(-2);
  return ymdhms;
}
