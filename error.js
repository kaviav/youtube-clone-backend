// u can call "createError(status, message)" where u want to see the error.

export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
