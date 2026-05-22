var isNS4    = document.layers    ? 1 : 0;
var isIE4    = (document.all && !document.getElementById) ? 1 : 0;
var isModern = document.getElementById ? 1 : 0;

function getEl(id) {
  if (isModern) return document.getElementById(id);
  if (isIE4)    return document.all[id];
  return null;
}

function setElText(el, text) {
  if (!el) return;
  if (typeof el.innerHTML != 'undefined') el.innerHTML = text;
}

function updateClock() {
  var d  = new Date();
  var h  = d.getHours();
  var m  = d.getMinutes();
  var s  = d.getSeconds();
  var ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (!h) h = 12;
  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;
  // NS4: getEl() returns null, setElText is a no-op — clock stays at page-load time.
  setElText(getEl('currentTime'), h + ':' + m + ':' + s + ' ' + ap);
}

if (typeof setInterval != 'undefined') {
  updateClock();
  setInterval(updateClock, 1000);
}
