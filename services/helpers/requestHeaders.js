import { getStoredToken } from "../../utils/tokenStorage";

export function getRequestHeaders(withToken = true) {
  const headers = {
    Contentype: "application/json",
  };
  if (withToken) {
    return getStoredToken().then((token) => {
      headers.Token = token;
      return { headers: headers };
    });
  } else {
    return { headers: headers };
  }
}

export function setRequestHeaders(withToken = False ){
  return []
}
