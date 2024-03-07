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

// COMMENT SECTION

// Check if there is a comment in the notice that the user open
const CheckComment = () => {
  // If the comment context do not exist just quit the function
  if (!comments) {
    return;
  }

  //   Transform into a Json the date from the context
  const LocalComments = JSON.parse(comments);
  //   Check if there is a comment in the new the user is watching
  const is_comment = LocalComments.filter((c) => {
    return c.code === $New_code.textContent;
  });

  // If there is no comment in this site just end the function

  console.log(is_comment);
  if (!is_comment[0]) {
    return;
  }

  // If the user is not login

  if (!JSON.parse(authUser)) {
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
    document.querySelector("#comment_Section").classList.add("hide");
    document.querySelector("#Other_Comment").classList.remove("hide");
    return;
  }

  // If There are not a user with the username login in the comments

  const is_user_comment = is_comment.some(
    (user) => user.user === JSON.parse(authUser).username
  );

  if (!is_user_comment) {
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
  } else {
    console.log(is_comment);
    // If there is a comment with the user currently login
    const my_comment = is_comment.filter((user) => {
      return user.user === JSON.parse(authUser).username;
    });
    console.log(my_comment);
    document.querySelector("#CommentValue").innerHTML = my_comment[0].comment;
    document.querySelector("#comment_Section").classList.add("hide");
    document.querySelector("#Comment").classList.remove("hide");

    const otherComments = is_comment.filter((user) => {
      return user.user !== JSON.parse(authUser).username;
    });

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
  }
};

if (!$New_code) {
} else {
  CheckComment();
  document.querySelector("#LoginComment").classList.add("hide");
}

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

  localStorage.setItem("comments", JSON.stringify(is_comment));
  document.querySelector("#comment_Section").classList.remove("hide");
  document.querySelector("#Comment").classList.add("hide");
};
