'use client';

import Script from 'next/script';
import { useClipboard, useColorMode, useScript } from '@/hooks';

/**
 * Homepage component replicating the original axle.coffee design
 */
export default function Home() {
	const { copyToClipboard } = useClipboard('Contact Info');
	const { toggleColorMode } = useColorMode();
	useScript('/js/main.js'); // Load main.js functionality

	/**
	 * Handles copying text to clipboard using the custom hook
	 * @param text - The text to copy to clipboard
	 * @param title - The title to display in the notification
	 */
	const handleCopyToClipboard = async (text: string, title: string) => {
		try {
			await copyToClipboard(text, title);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
		}
	};

	return (
		<>
			{/* Main Menu */}
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
							<svg
								viewBox="0 0 100 100"
								xmlns="http://www.w3.org/2000/svg"
								style={{ pointerEvents: 'none' }}
							>
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
										<span>Toggle Light Mode</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</menu>

			{/* Header */}
			<header>
				<div className="header_img flex_column_center">
					<img src="https://cdn.axle.coffee/raw/f4a3e6da.png" alt="Logo" />
				</div>
				<div className="header_text flex_column_center">
					<h1>Axle</h1>
				</div>
				<div className="header_svg_list flex_row_center">
					<nav>
						<ul className="header_nav_menu_list flex_no_wrap_row_center">
							<li
								data-target="#main_section_container_1"
								id="header_nav_menu_item_1"
								className="header_nav_menu_item"
							>
								Links
							</li>
							<li
								data-target="#main_section_container_2"
								id="header_nav_menu_item_2"
								className="header_nav_menu_item"
							>
								Projects
							</li>
							<li
								data-target="#main_section_container_3"
								id="header_nav_menu_item_3"
								className="header_nav_menu_item"
							>
								Extras
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Main Content */}
			<main>
				{/* Links Section */}
				<section id="main_section_container_1" className="flex_column_center">
					<div className="main_text_item">
						<p>
							17 He/Them 🏳️‍🌈 (📍 Ottawa, Canada) <br /> Developer, Long Distance Cyclist, Gamer
						</p>
					</div>
					<div className="main_small_button_list">
						<a className="main_small_a_item">
							<button
								className="main_small_button_item"
								onClick={() => handleCopyToClipboard('axle.coffee', 'Discord')}
							>
								Discord
							</button>
						</a>
						<a className="main_small_a_item">
							<button
								className="main_small_button_item"
								onClick={() => handleCopyToClipboard('contact@axle.coffee', 'E-Mail')}
							>
								E-Mail
							</button>
						</a>
					</div>
					<div className="main_small_button_list">
						<a className="main_small_a_item">
							<button
								className="main_small_button_item"
								onClick={() => handleCopyToClipboard('883356932', 'Genshin UUID')}
							>
								Genshin UUID
							</button>
						</a>
						<a className="main_small_a_item">
							<button
								className="main_small_button_item"
								onClick={() => handleCopyToClipboard('sadcolors', 'MC Username')}
							>
								MC Username
							</button>
						</a>
					</div>
					<a
						className="main_a_item"
						href="https://github.com/axlecoffee"
						target="_blank"
						rel="nofollow"
					>
						<button className="main_button_item">Github</button>
					</a>
					<a className="main_a_item" href="/payments" target="_blank" rel="nofollow">
						<button className="main_button_item">Payment Links</button>
					</a>
				</section>

				{/* Projects Section */}
				<section id="main_section_container_2" className="flex_column_center">
					<div className="main_text_item">
						<p>
							Some Projects I&apos;ve been working on recently! <br /> (both current and former
							projects are shown)
						</p>
					</div>
					<div className="main_small_button_list">
						<a
							className="main_small_a_item"
							href="https://github.com/SkyStats-Development/"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">SkyStats Development</button>
						</a>
						<a
							className="main_small_a_item"
							href="https://ratterscanner.com"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">Ratter Scanner Development</button>
						</a>
					</div>
					<div className="main_small_button_list">
						<a
							className="main_small_a_item"
							href="https://github.com/axlecoffee/NotEnoughOdin"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">
								Odin implementation on Lunar Client
							</button>
						</a>
						<a
							className="main_small_a_item"
							href="https://github.com/Noamm9/NoammAddons"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">NoammAddons</button>
						</a>
					</div>
					<a
						className="main_a_item"
						href="https://github.com/Mod-Checker"
						target="_blank"
						rel="nofollow"
					>
						<button className="main_button_item">Mod Checker Development</button>
					</a>
					<a
						className="main_a_item"
						href="https://polyfrost.org/projects/oneconfig/"
						target="_blank"
						rel="nofollow"
					>
						<button className="main_button_item">Polyfrost/OneConfig</button>
					</a>
				</section>

				{/* Extras Section */}
				<section id="main_section_container_3" className="flex_column_center">
					<div className="main_text_item">
						<p>
							File all complaints to my secretary, on discord, @pqndy <br /> Onyx the goat p sure
						</p>
					</div>
					<div className="main_small_button_list">
						<a
							className="main_small_a_item"
							href="https://open.spotify.com/user/pw73xl40lhdhxz4uev58laovn?si=44e75194dcbe4781"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">Pandy&apos;s Spotify</button>
						</a>
						<a
							className="main_small_a_item"
							href="https://open.spotify.com/user/5hdw5qlbo6d8z39r3vnh6dskv?si=49d193023b4e4959"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">My Spotify</button>
						</a>
					</div>
					<div className="main_small_button_list">
						<a
							className="main_small_a_item"
							href="https://open.spotify.com/playlist/1ywJVtMCPNBqSbGIVbTO7J?si=fa8387794a014eb8&pt=eda2073b5cfd136ffb83b67ead866e70"
							target="_blank"
							rel="nofollow"
						>
							<button className="main_small_button_item">May&apos;s Playlist</button>
						</a>
						<a className="main_small_a_item">
							<button className="main_small_button_item">Not Coming Soon</button>
						</a>
					</div>
					<a className="main_a_item" href="https://pandy.coffee/" target="_blank" rel="nofollow">
						<button className="main_button_item">Travel Scroll To Pandy&apos;s Cave</button>
					</a>
				</section>
			</main>

			{/* Footer */}
			<footer>
				<div className="footer_div_item flex_row_footer">
					<a className="footer_a_item">Axle Duggan</a>&nbsp;| © 2022-2025 all project rights
					reserved |
					<a className="footer_a_item" href="https://github.com/SkyStats-Development/license">
						&nbsp;SkyStats Development
					</a>
				</div>
			</footer>

			{/* Load external scripts */}
			<Script src="https://unpkg.com/akar-icons-fonts" strategy="lazyOnload" />

			{/* Clipboard Messages Container */}
			<div id="clipboardMessages"></div>
		</>
	);
}
