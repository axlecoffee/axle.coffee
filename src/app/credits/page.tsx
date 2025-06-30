'use client';

import Link from 'next/link';
import { useColorMode, useScript } from '@/hooks';

/**
 * Credits page component - displays attribution and licensing information
 */
export default function CreditsPage() {
	const { toggleColorMode } = useColorMode();
	useScript('/js/main.js'); // Load main.js functionality

	return (
		<>
			<menu>
				<nav>
					<div className="main_selection_item">
						<button
							className="main_selection_button_item"
							onClick={e => {
								// Find the actual button element regardless of what was clicked
								const button = e.currentTarget;
								button.classList.toggle('opened');
								button.setAttribute(
									'aria-expanded',
									button.classList.contains('opened').toString()
								);
								// Toggle dropdown menu
								const dropdownMenu = button.nextElementSibling as HTMLElement;
								if (dropdownMenu) {
									dropdownMenu.classList.toggle('opened');
								}
							}}
							aria-label="Main Menu"
						>
							<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
								<path
									className="line line1"
									d="M 20,34.7777 H 80 C 80,35 94.498839,28.817352 94,66.711331 94,77.980673 91.966081,81.670246 85.259173,81.667751 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25,25"
								/>
								<path className="line line2" d="M 20,50 H 80" />
								<path
									className="line line3"
									d="M 20,65 H 80 C 80,65 94.498839,71.182648 94,33.288669 94,22.019327 89.966081,18.332249 85.259173,18.332249 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25,75"
								/>
							</svg>
						</button>
						<div className="dropdown-menu">
							<ul>
								<li>
									<Link href="/" className="main_selection_menu_button_item">
										<i className="ai-home"></i>
										<span>Home</span>
									</Link>
								</li>
								<li>
									<a href="/payments" className="main_selection_menu_button_item">
										<i className="ai-credit-card"></i>
										<span>Payments</span>
									</a>
								</li>
								<li>
									<button className="main_selection_menu_button_item" onClick={toggleColorMode}>
										<i className="ai-sun-fill" id="mode-toggle"></i>
										<span>Color Mode</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</menu>

			<header>
				<div className="header_img flex_column_center">
					<img src="https://cdn.axle.coffee/raw/f4a3e6da.png" alt="Logo" />
				</div>
				<div className="header_text flex_column_center">
					<h1>Axle</h1>
					<h2>Credits</h2>
				</div>
				<div className="header_svg_list flex_row_center"></div>
			</header>

			<main>
				<section id="main_section_container_1" className="flex_column_center">
					<div className="main_text_item-c">
						<p>
							This website is built upon a template whose original source is unfortunately unknown,
							despite extensive searching. All modifications, enhancements, and ongoing development
							are openly available on GitHub:{' '}
							<a
								href="https://github.com/axlecoffee/axle.coffee"
								className="credits-link"
								target="_blank"
							>
								github.com/axlecoffee/axle.coffee
							</a>
							.<br />
							<br />
							<strong>Image Usage & Attribution:</strong>
							<br />- Most background and decorative images were sourced via Google Image Search for
							personal, non-commercial use. If you are the creator of any image and wish for it to
							be removed or credited differently, please contact me directly at{' '}
							<a href="mailto:bloodymountain@outlook.com" className="credits-link">
								bloodymountain@outlook.com
							</a>
							. I am committed to respecting creators&apos; rights and will respond within 14
							business days.
							<br />- The images titled &quot;Winter-Dark&quot; and &quot;Winter-Light&quot; are
							credited to The Stantig Group (
							<a href="mailto:sahdstantig@gmail.com" className="credits-link" target="_blank">
								sahdstantig@gmail.com
							</a>
							), used with appreciation.
							<br />- All images currently or previously used remain accessible at{' '}
							<a href="https://axle.coffee/img/" className="credits-link" target="_blank">
								https://axle.coffee/img/
							</a>
							. For a full list, see the GitHub repository or the <code>/img</code> directory.
							<br />
							- Please do not submit GitHub pull requests for image removal; direct email is
							preferred for prompt and respectful resolution. I am open to providing watermarks or
							negotiating usage as needed.
							<br />
							<br />
							<strong>Licensing & Rights:</strong>
							<br />- All original code and project assets are protected under the SkyStats
							Development License (
							<a
								href="https://github.com/SkyStats-Development/license"
								className="credits-link"
								target="_blank"
							>
								license details
							</a>
							).
							<br />
							- This site is strictly personal and non-commercial, similar to using images for a
							profile on a social platform. No images are used for profit or advertising.
							<br />
							<br />
							<strong>Open Source & Community:</strong>
							<br />
							- Contributions are welcome for code improvements, but please respect image ownership
							and licensing.
							<br />- For more information on the SkyStats Development License, visit:{' '}
							<a
								href="https://github.com/SkyStats-Development/license"
								className="credits-link"
								target="_blank"
							>
								SkyStats License
							</a>
							.<br />
							<br />
							Thank you to all creators and the open source community for inspiration and resources.
						</p>
					</div>
				</section>
			</main>

			<footer>
				<div className="footer_div_item flex_row_footer">
					<a className="footer_a_item">Axle Duggan</a>&nbsp;| © 2022-2025 all project rights
					reserved |
					<a className="footer_a_item" href="https://github.com/SkyStats-Development/license">
						&nbsp;SkyStats Development
					</a>
				</div>
			</footer>
		</>
	);
}
