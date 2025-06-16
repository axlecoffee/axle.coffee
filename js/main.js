/* Menu Active Codes */

let targets = document.querySelectorAll('[data-target]');
targets.forEach((element) => {
	element.addEventListener('click', () => {
		var target = document.querySelector(element.dataset.target);
		targets.forEach((element2) => {
			var target2 = document.querySelector(element2.dataset.target);
			element2.style.color = 'var(--menu_text_color)';
			target2.style.display = 'none';
		});
		element.style.color = 'var(--menu_active_text_color)';
		target.style.display = 'flex';
	});
});

let messageCount = 0;

const showMessage = () => {
	if (messageCount >= 5) {
		// Wait until the message count goes below the cap
		return;
	}
	const message = document.createElement('div');
	message.textContent = 'Copied to clipboard!';
	message.classList.add('clipboardMessage');
	document.getElementById('clipboardMessages').prepend(message);
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

const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
	body.classList.toggle('dark-mode');
});

// onload(body.classList.toggle('dark-mode'));

// Dropdown menu toggle for hamburger menu
/**
 * Ensures the entire .main_selection_button_item is clickable, not just the SVG.
 * Uses event delegation to handle clicks on the button or any of its children.
 */
document.querySelectorAll('.main_selection_button_item').forEach(btn => {
	btn.addEventListener('click', function (e) {
		// Only respond to left-clicks
		if (e.button !== 0) return;
		// Prevent default for <button>
		e.preventDefault();
		// Find the dropdown-menu sibling
		const dropdown = this.parentElement.querySelector('.dropdown-menu');
		if (dropdown) {
			dropdown.classList.toggle('opened');
		}
	});
});



