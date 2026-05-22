"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		setIsDark(document.documentElement.dataset.theme !== 'light');
	}, []);

	function toggle() {
		const html = document.documentElement;
		const next = html.dataset.theme === 'light' ? '' : 'light';
		html.dataset.theme = next;
		localStorage.setItem('theme', next === 'light' ? 'light' : 'dark');
		setIsDark(next !== 'light');
	}

	return (
		<button
			onClick={toggle}
			className="text-ctp-subtext0 hover:text-ctp-text text-sm leading-none font-ibm"
		>
			{isDark ? '[light]' : '[dark]'}
		</button>
	);
}
