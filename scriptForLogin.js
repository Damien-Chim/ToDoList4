var signUpForm = document.getElementById('signUpForm')
var signInForm = document.getElementById('signInForm')

var showSignInFormButton = document.getElementById('showSignInForm')
var showSignUpFormButton = document.getElementById('showSignUpForm')

showSignUpFormButton.addEventListener('click', function(event) {
    signInForm.style.display = 'none'
    signUpForm.style.display = 'block'
})

showSignInFormButton.addEventListener('click', function(event) {
    signUpForm.style.display = 'none'
    signInForm.style.display = 'block'
})