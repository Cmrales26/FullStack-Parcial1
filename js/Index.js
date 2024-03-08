const authUser = localStorage.getItem("User");
const comments = localStorage.getItem("comments");
const $New_code = document.querySelector("#NewCode");
const $comment_Data = document.querySelector("#Comment_Info");

window.onload = () => {
  // Check if the user is currently save in the localStorage
  if (!authUser) {
    return;
  }
  // Remove the Login to comment section
  // Remove the Btn for login and add the welcome message with the user info
  document.querySelector("#Btn_Sing_in").classList.add("hide");
  document.querySelector("#UserInfo").classList.remove("hide");

  // Welcome Message
  const userInfoElement = document.querySelector("#UserInfo a");
  userInfoElement.textContent =
    "Welcome, " + JSON.parse(authUser).username + "!";
};

const logOut = () => {
  // Remove The item User from localStorage
  localStorage.removeItem("User");
  // Add the Btn login and "Remove" the Welcome user's Message
  document.querySelector("#Btn_Sing_in").classList.remove("hide");
  document.querySelector("#UserInfo").classList.add("hide");
  window.location.reload();
};

setTimeout(() => {
  document.querySelector("#alert").classList.add("hide");
}, 5000);
