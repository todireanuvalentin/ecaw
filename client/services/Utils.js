const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || "/";
    let r = url.split("/");
    let request = {
      resource: null,
      id: null,
      verb: null
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
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
  }
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
