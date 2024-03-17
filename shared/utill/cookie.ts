export const getCookie = (cookieName: string) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie =
    name + "=; expires=Thu, 22 April 1997 00:00:00 UTC; path=/;";
};
