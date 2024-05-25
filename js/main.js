/* Menu Active Codes */

let targets = document.querySelectorAll('[data-target]')
targets.forEach(element => {
  element.addEventListener('click', () => {
    var target = document.querySelector(element.dataset.target)
    targets.forEach(element2 => {
      var target2 = document.querySelector(element2.dataset.target)
      element2.style.color = 'var(--menu_text_color)'
      target2.style.display = 'none'
    });
    element.style.color = 'var(--menu_active_text_color)'
    target.style.display= 'flex'
  })
})

let messageCount = 0;

const showMessage = () => {
  if (messageCount >= 5) {
    // Wait until the message count goes below the cap
    return;
  }
  const message = document.createElement('div');
  message.textContent = 'Copied to clipboard!';
  message.classList.add('clipboardMessage');
  document.getElementById('clipboardMessages').prepend(message)
  messageCount++;
  setTimeout(() => {
    message.remove();
    messageCount--;
    // 1s + 0.2 + 2.2 with a buffer
  }, 3450);
};

const copyElements = document.querySelectorAll('[id^="copy"]');

copyElements.forEach((element) => {
  element.addEventListener('click', showMessage);
});


const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});