var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.lang = 'ko-KR';
recognition.interimResults = false;
recognition.continious = true;
recognition.maxAlternatives = 1;

window.addEventListener('keydown', (e) => {
  if (e.key === 'h' && e.altKey) {
    recordVoice(recognition);
  }

  if (e.key === 'a' && e.altKey) {
    fetchCreateMemo();
  }
});

const recordBtn = document.querySelector('.record');
recordBtn.addEventListener('mousedown', (e) => {
  e.preventDefault();
  recordVoice(recognition);
});

function recordVoice(recognition) {
  recognition.start();

  recognition.onstart = function (event) {
    recordBtn.classList.remove('inactive');
    recordBtn.classList.add('active');
  };

  recognition.onend = function (event) {
    recordBtn.classList.add('inactive');
    recordBtn.classList.remove('active');
  };

  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();

    if (speechResult == '메모 추가') {
      fetchCreateMemo();
    } else {
      writeMemoToVoice(speechResult);
    }
  };
}

function fetchCreateMemo() {
  const addMemo = document.querySelector('.add_memo');
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

function writeMemoToVoice(speechResult) {
  const activeTagName = document.activeElement.tagName;

  if (activeTagName == 'TEXTAREA') {
    const activeTag = document.activeElement;
    activeTag.value += speechResult;
    updateMemo(activeTag.dataset.no, activeTag.value);
  } else {
    alert('텍스트 상자를 선택 후 다시 시도하세요.');
  }
}
