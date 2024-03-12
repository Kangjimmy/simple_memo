const changeSignUp = document.querySelector('.changeSignUp');
const imgBox2 = document.querySelector('.imgBox2');
const formBox = document.querySelector('.formBox');
const main = document.querySelector('.main');
const background2 = document.querySelector('.background2');

const changeSignIn = document.querySelector('.changeSignIn');
const imgBox = document.querySelector('.imgBox');
const formBox2 = document.querySelector('.formBox2');

changeSignUp.addEventListener('click', (e) => {
  imgBox2.classList.toggle('active');
  formBox.classList.toggle('active');
  imgBox.classList.toggle('active');
  formBox2.classList.toggle('active');
  background2.style.visibility = 'visible';
});

changeSignIn.addEventListener('click', (e) => {
  imgBox2.classList.toggle('active');
  formBox.classList.toggle('active');
  imgBox.classList.toggle('active');
  formBox2.classList.toggle('active');
  background2.style.visibility = 'hidden';
});

/**
 * 회원가입 과정
 */
const signupId = document.querySelector('#signupId');
const idCheck = document.querySelector('.idCheck');
const idUsed = document.querySelector('.idUsed');
const infoValidObj = {
  idChecked: false,
  idUsed: false,
  pwChecked: false,
  pwSame: false,
  name: false,
  tel: false,
};
// 아이디 유효성 검증
signupId.addEventListener('focusout', () => {
  let id = signupId.value.trim();
  if (id !== '') {
    if (!checkIdLength(id) || !onlyNumberAndEnglish(id)) {
      infoValidObj.idChecked = false;
      idUsed.classList.add('hide');
      idCheck.classList.remove('hide');
    } else {
      infoValidObj.idChecked = true;
      idCheck.classList.add('hide');
      checkIdDup(id)
        .then((res) => res.json())
        .then((data) => {
          if (!data.result) {
            infoValidObj.idUsed = false;
            idUsed.classList.remove('hide');
          } else {
            infoValidObj.idUsed = true;
            idUsed.classList.add('hide');
          }
        })
        .catch((err) => console.log(err));
    }
  } else {
    idUsed.classList.add('hide');
    infoValidObj.idChecked = false;
    idCheck.classList.remove('hide');
  }
});

//비밀번호 유효성 검증
const pwCheck = document.querySelector('.pwCheck');
const pwSame = document.querySelector('.pwSame');
const signupPw = document.querySelector('#signupPw');
const signupPwCheck = document.querySelector('#signupPwCheck');
signupPw.addEventListener('focusout', () => {
  let pw = signupPw.value.trim();
  let pw2 = signupPwCheck.value.trim();

  if (!checkPw(pw)) {
    infoValidObj.pwChecked = false;
    pwCheck.classList.remove('hide');
  } else {
    infoValidObj.pwChecked = true;
    pwCheck.classList.add('hide');
  }

  if (pw2 !== '') {
    if (pw !== pw2) {
      infoValidObj.pwSame = false;
      pwSame.classList.remove('hide');
    } else {
      infoValidObj.pwSame = true;
      pwSame.classList.add('hide');
    }
  }
});

signupPwCheck.addEventListener('focusout', () => {
  let pw = signupPw.value.trim();
  let pw2 = signupPwCheck.value.trim();

  if (pw !== pw2) {
    infoValidObj.pwSame = false;
    pwSame.classList.remove('hide');
  } else {
    infoValidObj.pwSame = true;
    pwSame.classList.add('hide');
  }
});

// 이름 유효성 검증
const signupName = document.querySelector('#signupName');
const nameCheck = document.querySelector('.nameCheck');
signupName.addEventListener('focusout', () => {
  let name = signupName.value.trim();
  if (!checkName(name)) {
    infoValidObj.name = false;
    nameCheck.classList.remove('hide');
  } else {
    infoValidObj.name = true;
    nameCheck.classList.add('hide');
  }
});

// 번호 유효성 검증
const signupTel = document.querySelector('#signupTel');
const telCheck = document.querySelector('.telCheck');
signupTel.addEventListener('focusout', () => {
  let tel = signupTel.value.trim();
  if (!checkTel(tel)) {
    infoValidObj.tel = false;
    telCheck.classList.remove('hide');
  } else {
    infoValidObj.tel = true;
    telCheck.classList.add('hide');
  }
});

// 최종 체크 후 가입처리 or 반려
const signupBtn = document.querySelector('.signupBtn');
const signupForm = document.querySelector('.form2');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const classArr = [idCheck, idUsed, pwCheck, pwSame, nameCheck, telCheck];
  const infoKey = Object.keys(infoValidObj);

  let isOkValid = true;
  infoKey.forEach((value, index) => {
    if (!infoValidObj[value]) {
      classArr[index].classList.remove('hide');
      isOkValid = false;
    }
  });
  if (!infoValidObj.idChecked && !infoValidObj.idUsed) {
    classArr[1].classList.add('hide');
  }

  if (isOkValid) {
    signupForm.submit();
  }
});

/**
 * 로그인 과정
 */
const form = document.querySelector('.form');
const signinCheck = document.querySelector('.signinCheck');
form.addEventListener('submit', (e) => {
  console.log('submit!!');
  e.preventDefault();
  const id = document.querySelector('#id').value;
  const pw = document.querySelector('#pw').value;
  fetch('/sign/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, pw }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.signin) {
        form.submit();
      } else {
        signinCheck.classList.remove('hide');
      }
    })
    .catch((err) => console.log(err));
});

async function checkIdDup(id) {
  const res = fetch('/sign/idCheck', {
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
