const authorityStoreItem = "rtc-authority";

export function getAuthority(str) {
  const authorityString =
    typeof str === "undefined" ? localStorage.getItem(authorityStoreItem) : str;
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === "string") {
    return [authority];
  }
  return authority || ["guest"];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === "string" ? [authority] : authority;
  return localStorage.setItem(authorityStoreItem, JSON.stringify(proAuthority));
}
