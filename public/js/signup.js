$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var babysNameInput= $("input#babysName-input");
  var babysBirthdayInput= $("input#babysBirthday-input")
  var usernameInput= $("input#username-input")

  // When the signup button is clicked, we validate the inputs are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      username: usernameInput.val().trim(),
      babysName: babysNameInput.val().trim(),
      babysBirthday: babysBirthdayInput.val().trim(),
    };

    if (!userData.email || !userData.password || !userData.username || !userData.babysName || !userData.babysBirthday) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.username, userData.babysName, userData.babysBirthday);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");
    babysName.val("");
    babysBirthday.val("")
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, username, babysName, babysBirthday) {
    $.post("/api/signup", {
      email: email,
      password: password,
      username: username,
      babysName: babysName,
      babysBirthday: babysBirthday
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr)
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
