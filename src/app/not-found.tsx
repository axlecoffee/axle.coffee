'use client';

import Link from 'next/link';
import { useColorMode, useScript } from '@/hooks';

/**
 * Custom 404 Not Found page component
 */
export default function NotFound() {
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
									<a href="/credits" className="main_selection_menu_button_item">
										<i className="ai-info"></i>
										<span>Credits</span>
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
					<h1>404</h1>
					<h2>Page Not Found</h2>
				</div>
			</header>

			<main>
				<section id="main_section_container_1" className="flex_column_center">
					<div className="main_text_item">
						<p>
							Oops! Looks like you&apos;ve wandered into the void. <br /> The page you&apos;re
							looking for doesn&apos;t exist.
						</p>
					</div>

					<div className="main_small_button_list">
						<Link className="main_small_a_item" href="/">
							<button className="main_small_button_item">Go Home</button>
						</Link>
						<a className="main_small_a_item" href="/payments">
							<button className="main_small_button_item">Payments</button>
						</a>
					</div>

					<div className="main_small_button_list">
						<a className="main_small_a_item" href="/credits">
							<button className="main_small_button_item">Credits</button>
						</a>
						<a className="main_small_a_item" href="javascript:history.back()">
							<button className="main_small_button_item">Go Back</button>
						</a>
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
