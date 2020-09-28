const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//Sign up
function validation1()
{
  var pass = document.getElementById('password2').value;
  if (pass != passworld2)
  {
    sweetAlert("Oop...", "Password Incorrect!", "error");
  }
  else
  {
    swal("Good job!", "You success to login", "success");
  }

}