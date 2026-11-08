const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');

function clearNotice() {
  notice.textContent = '';
}

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name === '') {
      notice.textContent = '닉네임을 입력하세요.';
      nameInput.focus();
      return;
    }

    if (message === '') {
      notice.textContent = '메시지를 입력하세요.';
      messageInput.focus();
      return;
    }

    clearNotice();
    const li = document.createElement('li');
    li.textContent = `${name}: ${message}`;
    list.append(li);
    form.reset();
    nameInput.focus();
  });
}

if (nameInput) nameInput.addEventListener('input', clearNotice);
if (messageInput) messageInput.addEventListener('input', clearNotice);