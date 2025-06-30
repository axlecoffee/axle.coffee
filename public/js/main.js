/**
 * @fileoverview Core JavaScript functionality for Axle's Coffee website
 * Handles clipboard operations, menu interactions, color mode toggle, and dropdown behavior
 * Compatible with both legacy DOM manipulation and modern React components
 *
 * @author Axle Duggan
 * @version 2.0.0
 * @requires DOM API
 * @requires Clipboard API
 *
 * @example
 * // Automatically initializes when script loads
 * // Attaches event listeners to relevant DOM elements
 */

(function () {
	'use strict';

	/**
	 * Menu navigation system for switching between content sections
	 * Handles active state management and visibility toggling
	 */

	/**
	 * Elements with data-target attributes for section switching
	 * @type {NodeListOf<Element>}
	 */
	const targets = document.querySelectorAll('[data-target]');

	/**
	 * Handles menu navigation between different content sections
	 * Updates active states and toggles section visibility
	 * @function
	 * @param {Element} clickedElement - The menu item that was clicked
	 */
	targets.forEach(element => {
		element.addEventListener('click', () => {
			var target = document.querySelector(element.dataset.target);
			targets.forEach(element2 => {
				var target2 = document.querySelector(element2.dataset.target);
				element2.style.color = 'var(--menu_text_color)';
				target2.style.display = 'none';
			});
			element.style.color = 'var(--menu_active_text_color)';
			target.style.display = 'flex';
		});
	});

	/**
	 * Counter for tracking concurrent clipboard notification messages
	 * Prevents spam by limiting the number of simultaneous notifications
	 * @type {number}
	 */
	let messageCount = 0;

	/**
	 * Shows clipboard notification message with rate limiting
	 */
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

	copyElements.forEach(element => {
		element.addEventListener('click', showMessage);
	});

	// Color mode toggle - only initialize if element exists (for React compatibility)
	const modeToggle = document.getElementById('mode-toggle');
	if (modeToggle) {
		const body = document.body;

		modeToggle.addEventListener('click', () => {
			body.classList.toggle('light-mode');
		});
	}

	// Close dropdown when clicking outside
	document.addEventListener('click', e => {
		const dropdownMenus = document.querySelectorAll('.dropdown-menu');
		const menuButtons = document.querySelectorAll('.main_selection_button_item');

		dropdownMenus.forEach((menu, index) => {
			const button = menuButtons[index];
			if (button && !button.contains(e.target) && !menu.contains(e.target)) {
				menu.classList.remove('opened');
				button.classList.remove('opened');
				button.setAttribute('aria-expanded', 'false');
			}
		});
	});

	// onload(body.classList.toggle('light-mode'));

	// Dropdown menu toggle is now handled by React - removing conflicting JavaScript
})();
// The React component handles the dropdown toggle directly in the onClick handler
