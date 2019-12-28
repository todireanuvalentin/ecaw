const Utils = {
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || "/";
    let r = url.split("/");
    let request = {
      resource: null,
      id: null
    };
    request.resource = r[0];
    request.id = r[1];

    return request;
  },
  sleep: ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  loggedIn: () => {
    return loggedIn();
  },
  redirectIfNotLoggedIn: async () => {
    let ok = await loggedIn();
    if (!ok) {
      window.location.hash = "#/login";
      return true;
    }
  },
  getCookie: name => {
    return getCookie(name);
  },
  setCookie: (name, cvalue, hours) => {
    return setCookie(name, cvalue, hours);
  },
  toDataURL: url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      )
};
async function loggedIn() {
  var settings = {
    method: "POST",
    body: JSON.stringify({ jwt: getCookie("jwt") }),
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    json: true
  };
  let response = await fetch("http://localhost:3000/verify", settings);
  let json = "";
  if (response.ok) {
    json = await response.json();
  }
  return json.message == "ok";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, hours) {
  var d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default Utils;
