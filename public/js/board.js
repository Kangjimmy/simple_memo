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

// add
const addMemo = document.querySelector('.add_memo');
addMemo.addEventListener('click', () => {
  fetch('/board/addMemo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        console.log('add memo failed');
      } else {
        const createdNode = createMemo({ no: data.insertId, memo: '' });
        board.appendChild(createdNode);
      }
    });
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
  memoDiv.setAttribute('class', 'memo');

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
