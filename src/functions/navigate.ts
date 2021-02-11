export const navigate = (url: string) => {
  location.href = location.origin + '/#' + url;
};
