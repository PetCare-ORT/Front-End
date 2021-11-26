import { getStoredToken } from "../../utils/tokenStorage";

export function getRequestHeaders() {
  return getStoredToken().then((token) => {
    const headers = {};
    headers.Token = token;
    return { headers: headers };
  });
}
