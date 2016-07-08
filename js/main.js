// https://dweet.io/dweet/for/email-overload
var DWEET_CHANNEL = "email-overload";

console.log("dweet is listening on channel '" + DWEET_CHANNEL + "'");

function fill(klass, value) {
  $("." + klass).html(value);
};

function fillWithParams(params) {
  _.keys(params).forEach(function(key) {
    fill(key, params[key]);
  });
}

var date = new Date();
var dateTimeString = date.toLocaleDateString() + " at " + date.toLocaleTimeString();

var defaultParams = {
  "eo-from-name": "Jonathan Leung",
  "eo-from-email": 'me@jonl.org',
  "eo-subject": "Yup, here's another fucking email.",
  "eo-date": dateTimeString, //"Thu, 5 Apr 2012 16:59:01 +0200",
  "eo-body": "Yup, this is just going to drone on and on and on isn't it...",
  "eo-to-email": "jjleung137@gmail.com",
}

fillWithParams(defaultParams);

dweetio.listen_for(DWEET_CHANNEL, function(dweet){
  var email = dweet.content;

  var date = new Date(email.Date);
  var dateTimeString = date.toLocaleDateString() + " at " + date.toLocaleTimeString();

  var params = {
    "eo-from-name": email.From.Name,
    "eo-from-email": email.From.Email,
    "eo-subject": email.Subject,
    "eo-date": dateTimeString,
    "eo-body": email.TextBody.replace(/\n/g,"<br>"),
    "eo-to-email": "jjleung137@gmail.com"
  }

  fillWithParams(params);

  if(window.location.hash.indexOf("no") > -1 && window.location.hash.indexOf("print") > -1) {
    console.log('suppressed print')
  }
  else {
    window.print();
  }

});
