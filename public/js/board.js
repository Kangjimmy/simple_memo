const memberBtn = document.querySelector('.memberBtn');
const board = document.querySelector('.board');

// init
selectMemo();

// delete
board.addEventListener('dblclick', (e) => {
  if (e.target.tagName === 'TEXTAREA') {
    deleteMemo(e.target.dataset.no, e.target.parentElement);
  }
});

const addMemo = document.querySelector('.add_memo');

const colors = document.querySelectorAll('.colorBox1 div');
colors.forEach((colorBox) => {
  colorBox.addEventListener('click', () => {
    const active = document.querySelector('.add_selected');
    active.classList.remove('add_selected');
    colorBox.classList.add('add_selected');
    addMemo.dataset.color = colorBox.dataset.color;
  });
});

// add
addMemo.addEventListener('click', (e) => {
  if (!e.target.classList[0].startsWith('color')) {
    console.log(addMemo.dataset.color);
    fetch('/board/addMemo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memo_color: addMemo.dataset.color }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          console.log('add memo failed');
        } else {
          const createdNode = createMemo({
            no: data.insertId,
            memo_color: addMemo.dataset.color,
            memo: '',
          });
          board.appendChild(createdNode);
        }
      });
  }
});

// modify
let timeoutId;

board.addEventListener('input', (e) => {
  if (e.target.tagName === 'TEXTAREA') {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      updateMemo(e.target.dataset.no, e.target.value);
    }, 1000);
  }
});

function updateMemo(no, text) {
  fetch('/board/updateMemo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no, text }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.result) {
        console.log('update error');
      }
    });
}

function updateMemoColor(no, color) {
  fetch('/board/updateMemoColor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no, color }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.result) {
        console.log('update error');
      }
    });
}

function selectMemo() {
  // board
  fetch('/board/getMemo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item, index) => {
        board.appendChild(createMemo(item));
      });
    });
}

function deleteMemo(no, deleteNode) {
  fetch('/board/deleteMemo', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ no }),
  })
    .then(() => {
      board.removeChild(deleteNode);
    })
    .catch(console.error);
}

function createMemo(info) {
  const memoDiv = document.createElement('div');
  memoDiv.setAttribute('class', `memo color${info.memo_color}`);
  memoDiv.setAttribute('data-color', info.memo_color);

  const colorBox = createColorBox(memoDiv, info);
  memoDiv.appendChild(colorBox);

  const textarea = document.createElement('textarea');
  textarea.setAttribute('name', `${info.no}`);
  textarea.setAttribute('id', `${info.no}`);
  textarea.setAttribute('class', 'textarea');
  textarea.setAttribute('spellcheck', 'false');
  textarea.dataset.no = info.no;
  textarea.textContent = info.memo;

  memoDiv.appendChild(textarea);

  return memoDiv;
}

function createColorBox(memoDiv, info) {
  const colorBox = document.createElement('div');
  colorBox.setAttribute('class', 'colorBox');

  memoDiv.addEventListener('mouseover', () => {
    colorBox.classList.add('active');
  });
  memoDiv.addEventListener('mouseout', () => {
    colorBox.classList.remove('active');
  });

  for (let i = 1; i <= 4; i++) {
    let colorDiv = document.createElement('div');
    info.memo_color == i
      ? colorDiv.setAttribute('class', `color${i} memo_selected`)
      : colorDiv.setAttribute('class', `color${i}`);
    colorDiv.setAttribute('data-color', i);
    colorDiv.addEventListener('mouseover', () => {
      colorDiv.classList.add('over');
    });
    colorDiv.addEventListener('mouseout', () => {
      colorDiv.classList.remove('over');
    });
    colorBox.appendChild(colorDiv);
  }

  // 컬러가 바꼈을때 메모색 업데이트 하는 부분을 이벤트로 추가
  const childNodes = colorBox.childNodes;
  childNodes.forEach((node) => {
    node.addEventListener('click', () => {
      console.log('click!!');
      childNodes.forEach((e) => {
        e.classList.remove('memo_selected');
      });
      node.classList.add('memo_selected');
      memoDiv.dataset.color = node.dataset.color;
      memoDiv.setAttribute('class', `memo color${memoDiv.dataset.color}`);
      updateMemoColor(info.no, memoDiv.dataset.color);
    });
  });
  return colorBox;
}
