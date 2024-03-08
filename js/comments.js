const authUser = localStorage.getItem("User");
const comments = localStorage.getItem("comments");
const $New_code = document.querySelector("#NewCode");
const $comment_Data = document.querySelector("#Comment_Info");

window.onload = () => {
  // If there are no code it's bcs there is a mistake in the HTML Structure
  if (!$New_code) {
    console.error("New Code not found");
    return;
  }

  //Check if the user is current login to update the navbar also some aspect of the comment options
  checkLogin(authUser);

  // Check Comments Values
  checkComments();
};

const checkLogin = (user) => {
  if (!user) {
    document.querySelector("#comment_Section").classList.add("hide");
    return;
  } else {
    document.querySelector("#Btn_Sing_in").classList.add("hide");
    document.querySelector("#UserInfo").classList.remove("hide");
    const userInfoElement = document.querySelector("#UserInfo a");
    userInfoElement.textContent =
      "Welcome, " + JSON.parse(authUser).username + "!";
    document.querySelector("#LoginComment").classList.add("hide");
  }
};

const checkComments = () => {
  if (!comments) {
    return;
  }

  //   Transform into a Json the date from the context
  const LocalComments = JSON.parse(comments);
  //   Check if there is a comment in the new the user is watching
  const is_comment = LocalComments.filter((c) => {
    return c.code === $New_code.textContent;
  });

  //   There are comments but not in this new
  if (!is_comment[0]) {
    console.warn("No comments in this new");
    return;
  }

  // If the user is not login

  if (!JSON.parse(authUser)) {
    console.log("If the user is not login");
    let commentsHTML = "";
    // Each element of the vector is traversed and html injection is performed
    is_comment.forEach(function (comment) {
      commentsHTML +=
        "<h6 class='fw-bold'>" +
        comment.user +
        "</h6>" +
        "<p>" +
        comment.comment +
        "</p>" +
        "<hr>";
    });
    document.querySelector("#Other_CommentValue").innerHTML = commentsHTML;
    document.querySelector("#Other_Comment").classList.remove("hide");
    return;
  }

  //   Found a comment that has the same user that the user login
  const is_user_comment = is_comment.some(
    (user) => user.user === JSON.parse(authUser).username
  );

  console.log(is_user_comment);

  if (!is_user_comment) {
    console.log("The user login don't have a comment in this new");
    let commentsHTML = "";
    is_comment.forEach(function (comment) {
      commentsHTML +=
        "<h6 class='fw-bold'>" +
        comment.user +
        "</h6>" +
        "<p>" +
        comment.comment +
        "</p>" +
        "<hr>";
    });
    document.querySelector("#Other_CommentValue").innerHTML = commentsHTML;
    document.querySelector("#comment_Section").classList.remove("hide");
    document.querySelector("#Other_Comment").classList.remove("hide");
    return;
  }

  // If there is a comment with the user currently login
  const my_comment = is_comment.filter((user) => {
    return user.user === JSON.parse(authUser).username;
  });

  console.log("The user login Have a comment in this new");
  //Show the user login comment
  document.querySelector("#CommentValue").innerHTML = my_comment[0].comment;
  document.querySelector("#comment_Section").classList.add("hide");
  document.querySelector("#Comment").classList.remove("hide");

  //Get the comment in where user is not the same that the user login
  const otherComments = is_comment.filter((user) => {
    return user.user !== JSON.parse(authUser).username;
  });

  //Show the other comments
  let commentsHTML = "";
  otherComments.forEach(function (comment) {
    commentsHTML +=
      "<h6 class='fw-bold'>" +
      comment.user +
      "</h6>" +
      "<p>" +
      comment.comment +
      "</p>" +
      "<hr>";
  });
  document.querySelector("#Other_Comment").classList.remove("hide");
  document.querySelector("#Other_CommentValue").innerHTML = commentsHTML;
};

const saveComment = () => {
  let user = JSON.parse(authUser).username;
  // Validations
  if (!$New_code) {
    return;
  }

  if ($comment_Data.value === "") {
    return;
  }
  if (!authUser) {
    return;
  }

  const values = {
    code: $New_code.textContent,
    comment: $comment_Data.value,
    user: user,
  };

  const objectData = [values];

  if (!comments) {
    //Comments Storage is not already done
    localStorage.setItem("comments", JSON.stringify(objectData));
    document.querySelector("#CommentValue").innerHTML = $comment_Data.value;
    document.querySelector("#comment_Section").classList.add("hide");
    document.querySelector("#Comment").classList.remove("hide");
    return;
  } else {
    // There are already comments in the section
    let allComments = JSON.parse(comments);
    allComments.push(values);
    localStorage.setItem("comments", JSON.stringify(allComments));
    document.querySelector("#CommentValue").innerHTML = $comment_Data.value;
    document.querySelector("#comment_Section").classList.add("hide");
    document.querySelector("#Comment").classList.remove("hide");
  }
};

// Remove My owm Comment
const removeMyComment = () => {
  //   Transform into a Json the date from the context
  const LocalComments = JSON.parse(comments);
  const user = JSON.parse(authUser).username;
  //   Check if there is a comment in the new the user is watching
  console.log();
  const is_comment = LocalComments.filter((c) => {
    return (
      // Take the values that are not the same with de news code but it is also not the same with the username of the user login
      c.code !== $New_code.textContent ||
      (c.code === $New_code.textContent && c.user !== user)
    );
  });

  //   Change values in localStorage and update the interface

  localStorage.setItem("comments", JSON.stringify(is_comment));
  document.querySelector("#comment_Section").classList.remove("hide");
  document.querySelector("#Comment").classList.add("hide");
};

const logOut = () => {
  // Remove The item User from localStorage
  localStorage.removeItem("User");
  // Add the Btn login and "Remove" the Welcome user's Message
  document.querySelector("#Btn_Sing_in").classList.remove("hide");
  document.querySelector("#UserInfo").classList.add("hide");
  window.location.reload();
};
