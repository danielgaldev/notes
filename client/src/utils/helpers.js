export const onSuccess = callback => status => {
  if (status >= 200 && status < 300) {
    callback();
    return true;
  } else {
    return false;
  }
}
