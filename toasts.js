const errorEl = document.getElementById("error-toast");
const warningEl = document.getElementById("warning-toast");
const successEl = document.getElementById("success-toast");

export function errorToast(message) {
  errorEl.classList.remove("toast-closed");
  errorEl.classList.add("toast-open");
  errorEl.querySelector("#error-message").innerText = message;

  errorEl.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    errorEl.classList.add("toast-closed");
    errorEl.classList.remove("toast-open");
  });

  setTimeout(() => {
    errorEl.classList.remove("toast-open");
    errorEl.classList.add("toast-closed");
  }, 5000);
}

export function successToast(message) {
  successEl.classList.remove("toast-closed");
  successEl.classList.add("toast-open");
  successEl.querySelector("#success-message").innerText = message;

  successEl.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    successEl.classList.add("toast-closed");
    successEl.classList.remove("toast-open");
  });

  setTimeout(() => {
    successEl.classList.remove("toast-open");
    successEl.classList.add("toast-closed");
  }, 5000);
}

export function warningToast(message) {
  warningEl.classList.remove("toast-closed");
  warningEl.classList.add("toast-open");
  warningEl.querySelector("#warning-message").innerText = message;

  warningEl.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    warningEl.classList.add("toast-closed");
    warningEl.classList.remove("toast-open");
  });

  setTimeout(() => {
    warningEl.classList.remove("toast-open");
    warningEl.classList.add("toast-closed");
  }, 5000);
}
