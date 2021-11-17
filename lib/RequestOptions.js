export default Object.freeze({
  LOGIN: (email, password) => {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    return {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email: email, password: password }),
    };
  },
});
