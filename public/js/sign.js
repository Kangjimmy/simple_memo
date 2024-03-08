const changeSignUp = document.querySelector('.changeSignUp');
const imgBox2 = document.querySelector('.imgBox2');
const formBox = document.querySelector('.formBox');

const changeSignIn = document.querySelector('.changeSignIn');
const imgBox = document.querySelector('.imgBox');
const formBox2 = document.querySelector('.formBox2');

changeSignUp.addEventListener('click', (e) => {
  imgBox2.classList.toggle('active');
  formBox.classList.toggle('active');
  imgBox.classList.toggle('active');
  formBox2.classList.toggle('active');
});

changeSignIn.addEventListener('click', (e) => {
  imgBox2.classList.toggle('active');
  formBox.classList.toggle('active');
  imgBox.classList.toggle('active');
  formBox2.classList.toggle('active');
});
