export const handleClose = (form, setForm, setContainer) => {
  if (form === "login") {
    setContainer();
  } else {
    setForm("login");
  }
};
