const $username = document.querySelector("#User");
const $pass = document.querySelector("#Password");

const login = () => {
  if ($username.value === "") {
    document.querySelector("#user_help").innerHTML = "Please Insert Username";
    setTimeout(() => remove_alert("#user_help"), 3000);
    return;
  }
  if ($pass.value === "") {
    document.querySelector("#pass_help").innerHTML = "Please Insert Password";
    setTimeout(() => remove_alert("#pass_help"), 3000);
    return;
  }
  localStorage.setItem(
    "User",
    JSON.stringify({
      username: $username.value,
      pass: $pass.value,
    })
  );
  window.location.href = "/index.html";
};

const remove_alert = (alert_element) => {
  document.querySelector(alert_element).innerHTML = " ";
};
