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

const signupId = document.querySelector('#signupId');
const idCheck = document.querySelector('.idCheck');
const idUsed = document.querySelector('.idUsed');

// 아이디 유효성 검증
signupId.addEventListener('focusout', (e) => {
  let id = e.target.value.trim();
  if (id !== '') {
    if (!checkIdLength(id) || !onlyNumberAndEnglish(id)) {
      idCheck.classList.remove('hide');
    } else {
      idCheck.classList.add('hide');
      checkIdDup(id)
        .then((res) => res.json())
        .then((data) => {
          if (!data.result) {
            idUsed.classList.remove('hide');
          } else {
            idUsed.classList.add('hide');
          }
        })
        .catch((err) => console.log(err));
    }
  } else {
    idUsed.classList.add('hide');
    idCheck.classList.remove('hide');
  }
});

//비밀번호 유효성 검증
const pwCheck = document.querySelector('.pwCheck');
const pwSame = document.querySelector('.pwSame');
const signupPw = document.querySelector('#signupPw');
const signupPwCheck = document.querySelector('#signupPwCheck');
signupPw.addEventListener('focusout', (e) => {
  let pw = e.target.value.trim();
  let pw2 = signupPwCheck.value.trim();

  if (!checkPw(pw)) {
    pwCheck.classList.remove('hide');
  } else {
    pwCheck.classList.add('hide');
  }

  if (pw2 !== '') {
    if (pw !== pw2) {
      pwSame.classList.remove('hide');
    } else {
      pwSame.classList.add('hide');
    }
  }
});

signupPwCheck.addEventListener('focusout', (e) => {
  let pw = signupPw.value.trim();
  let pw2 = e.target.value.trim();

  if (pw !== pw2) {
    pwSame.classList.remove('hide');
  } else {
    pwSame.classList.add('hide');
  }
});

// 이름 유효성 검증
const signupName = document.querySelector('#signupName');
const nameCheck = document.querySelector('.nameCheck');
signupName.addEventListener('focusout', (e) => {
  let name = e.target.value.trim();
  if (!checkName(name)) {
    nameCheck.classList.remove('hide');
  } else {
    nameCheck.classList.add('hide');
  }
});

// 번호 유효성 검증
const signupTel = document.querySelector('#signupTel');
const telCheck = document.querySelector('.telCheck');
signupTel.addEventListener('focusout', (e) => {
  let tel = e.target.value.trim();
  if (!checkTel(tel)) {
    telCheck.classList.remove('hide');
  } else {
    telCheck.classList.add('hide');
  }
});

// 최종 체크

async function checkIdDup(id) {
  const res = fetch('/idCheck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res;
}

function checkIdLength(id) {
  return id.length >= 4 && id.length <= 12;
}
function onlyNumberAndEnglish(id) {
  return /^[a-zA-Z0-9]*$/.test(id);
}

function checkPw(pw) {
  return /^[a-zA-Z\d!@#$%^&*()]{8,16}$/.test(pw);
}

function checkName(name) {
  return /^[a-zA-Z가-힣]+$/.test(name);
}

function checkTel(tel) {
  return /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(tel);
}
