import Image from 'next/image';
import Nav from './components/Nav';
import { fetchWeather, fetchGitHub } from './lib/api';
import type { WeatherData, GitHubData } from './types';

function Box({ title, color, children, dashed = false }: { title: string; color: string; children: React.ReactNode; dashed?: boolean }) {
	return (
		<section
			className="box-hover p-4"
			style={
				{
					'--box-color': `var(--ctp-${color})`,
					border: `1px solid var(--ctp-${color})`,
					borderStyle: dashed ? 'dashed' : 'solid',
					boxShadow: `inset 0 0 0 1px color-mix(in oklch, var(--ctp-${color}) 45%, transparent)`,
					transition: 'box-shadow 0.15s ease',
				} as React.CSSProperties
			}
		>
			<h2 className="font-ibm text-ctp-subtext0 text-xs uppercase tracking-widest mb-3">{title}</h2>
			{children}
		</section>
	);
}

function LiveBox({ weather, github }: { weather: WeatherData | null; github: GitHubData | null }) {
	return (
		<Box title="Stats :3" color="green">
			<div className="text-sm space-y-1">
				{weather ? (
					<>
						<p className="font-iosevka text-ctp-text">
							{weather.data.temperature}
							{weather.data.temperatureUnit} - feels {weather.data.feels}
							{weather.data.feelsUnit}
						</p>
						<p className="font-iosevka text-ctp-subtext0 text-xs">
							{weather.data.humidity}% humidity - {weather.data.wind} km/h {weather.data.windDirection}
						</p>
						<p className="font-iosevka text-ctp-overlay1 text-xs">
							{weather.data.gusts} km/h gusts - {weather.data.pressure} {weather.data.pressureUnit} {{ rising: '↑', falling: '↓', steady: '-' }[weather.data.pressureDirection] ?? weather.data.pressureDirection}
						</p>
					</>
				) : (
					<p className="text-ctp-overlay1 text-xs">loading weather...</p>
				)}
				<hr className="border-ctp-surface1 my-2" />
				{github ? (
					<>
						<p className="font-iosevka text-ctp-text">&#62; {github.commits.week_current} commits this week</p>
						<p className="font-iosevka text-ctp-subtext0 text-xs">&#62; {github.total_commits} total commits</p>
						<p className="font-iosevka text-ctp-subtext0 text-xs">
							&#62; {github.total_stars_earned} stars earned - {github.contributed_to} repos contributed
						</p>
					</>
				) : (
					<p className="text-ctp-overlay1 text-xs">loading github...</p>
				)}
			</div>
		</Box>
	);
}

export default async function Home() {
	const [weather, github] = await Promise.all([fetchWeather(), fetchGitHub()]);

	return (
		<>
			<Nav />
			<main className="max-w-5xl mx-auto px-2 py-6 flex-1">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
					<div className="col-span-1 md:col-span-3 flex flex-col gap-4">
						<Box title="ABOUT" color="mauve">
							<div className="text-sm space-y-2">
								<p className="text-ctp-text">
									Haia! I&apos;m Axle [he/them] and this is my bio/whatever page.<br></br>
									I&apos;m currently a 17-year-old{' '}
									<a href="https://en.wikipedia.org/wiki/Occupational_burnout" target="_blank" rel="noreferrer" className="text-ctp-blue hover:text-ctp-text underline">
										burned out
									</a>{' '}
									catboy, someday software engineer and soon-to-be CS student based out of the capital of Canada, Ottawa!
								</p>
								<p className="text-ctp-text">
									I&apos;ve done a lot of Typescript, Java, Kotlin, and C++ programming, right now I&apos;m trying to detox myself from AI and the{' '}
									<a href="https://en.wikipedia.org/wiki/Enshittification" target="_blank" rel="noreferrer" className="text-ctp-blue hover:text-ctp-text underline">
										enshittification of the internet
									</a>
								</p>
								<p className="text-ctp-text">
									I have created projects ranging from API&apos;s to web automation tools, I&apos;ve helped at Malware detection and analysis organizations, and I even ran my own Malware detection service for a while, co-developed with
									the &quot;best&quot; dev and the best catboy in the world,{' '}
									<a href="https://ghosty.im/" target="_blank" rel="noreferrer" className="text-ctp-blue hover:text-ctp-text underline">
										Ghosty
									</a>
								</p>
								<p className="text-ctp-text">
									I&apos;m an aspiring long distance cyclist aiming to hit 200km single rides to Montréal in 2026~<br></br>I am a mediocre photographer, baker, and chef, I run my own homelab comprising of 2 servers, and that is where this
									site is currently deployed!
								</p>
								<p className="text-ctp-subtext0 text-xs mt-2">
									&#62;{' '}
									<a href="/about" className="text-ctp-mauve hover:text-ctp-text underline">
										obsessed?
									</a>
								</p>
							</div>
						</Box>

						<Box title="contact" color="teal">
							<ul className="text-sm space-y-1">
								<li className="text-ctp-text">
									&#62; discord: <span className="text-ctp-teal">@axle.coffee</span>
								</li>
								<li className="text-ctp-text">
									&#62; github:{' '}
									<a href="https://github.com/axlecoffee" className="text-ctp-teal hover:text-ctp-text">
										https://github.com/axlecoffee
									</a>
								</li>
								<li className="text-ctp-text">
									&#62; email: <span className="text-ctp-teal">contact@axle.coffee</span>
								</li>
								<li className="text-ctp-text">
									&#62; server:{' '}
									<a href="https://discord.gg/4umJGqwftc" className="text-ctp-teal hover:text-ctp-text">
										https://discord.gg/4umJGqwftc
									</a>
								</li>
								<li className="text-ctp-text">
									&#62; genshin uid: <span className="text-ctp-teal">883356932</span>
								</li>
							</ul>
						</Box>
					</div>

					<div className="col-span-1 md:col-span-2 flex flex-col gap-4">
						<Box title="projects" color="blue">
							<ul className="text-sm space-y-1">
								<li className="text-ctp-text">
									&#62;{' '}
									<a href="https://github.com/axlecoffee/CoffeeClient" className="text-ctp-blue hover:text-ctp-text">
										CoffeeClient
									</a>
									{' // Lunar-Client shim API and QOL Mod'}
								</li>
								<li className="text-ctp-text">
									&#62;{' '}
									<a href="https://github.com/project-suim/SUIM" className="text-ctp-blue hover:text-ctp-text">
										Project-SUIM
									</a>
									{' // Myau Client reflection API'}
								</li>
								<li className="text-ctp-text">
									&#62;{' '}
									<a href="https://github.com/axlecoffee/blahaj" className="text-ctp-blue hover:text-ctp-text">
										Blahaj
									</a>
									{' // fully automated gradle plugin for MC'}
								</li>
								<li className="text-ctp-text">
									&#62;{' '}
									<a href="https://ratterscanner.com" className="text-ctp-blue hover:text-ctp-text">
										RatterScanner
									</a>
									{' // Minecraft Malware checker'}
								</li>
							</ul>
						</Box>

						<LiveBox weather={weather} github={github} />

						<Box title="outlinks" color="peach" dashed>
							<ul className="text-sm space-y-1">
								<li>
									&#62;{' '}
									<a href="https://ghosty.im/" className="text-ctp-peach hover:text-ctp-text">
										Ghosty
									</a>
									{' // '}
									cool dev + best animal 👑 + marriageable friend,,, ily qt
								</li>
								<li>
									&#62;{' '}
									<a href="https://aprl.pet/" className="text-ctp-peach hover:text-ctp-text">
										April
									</a>
									{' // '}
									really cool reverse engineer
								</li>
								<li>
									&#62;{' '}
									<a href="https://dragonwarriorp.ee" className="text-ctp-peach hover:text-ctp-text">
										Scale
									</a>
									{' // '}- goated dev against AI bullshit
								</li>
							</ul>
							<hr className="border-ctp-surface1 my-2" />
							<div className="flex gap-2 flex-wrap">
								<a href="https://aprl.pet/" target="_blank" rel="noreferrer" style={{ lineHeight: 0 }}>
									<Image src="https://aprl.pet/assets/badges/april.png" alt="April" width={88} height={31} style={{ imageRendering: 'pixelated' }} unoptimized />
								</a>
								<a href="https://meows.zip/" target="_blank" rel="noreferrer" style={{ lineHeight: 0 }}>
									<Image src="https://meows.zip/meowszip.png" alt="meows.zip" width={88} height={31} style={{ imageRendering: 'pixelated' }} unoptimized />
								</a>
								<a href="https://112batman.com/" target="_blank" rel="noreferrer" style={{ lineHeight: 0 }}>
									<Image src="https://112batman.com/files/88x31/112batman.com.gif" alt="112batman.com" width={88} height={31} style={{ imageRendering: 'pixelated' }} unoptimized />
								</a>
							</div>
						</Box>
					</div>
				</div>
			</main>

			<footer>
				<div className="max-w-5xl mx-auto px-2">
					<div className="py-2">
						<span className="text-xs text-ctp-lavender">&copy; 2022-{new Date().getFullYear()} {" "}
							<a href="https://github.com/axlecoffee/axle.coffee/blob/15c10488577778b8d5fa9d4e9e1eb36866e444ed/LICENSE" target="_blank" rel="noreferrer" className="text-ctp-lavender hover:text-ctp-text underline">
								axle.coffee
							</a>
						</span>
					</div>
					<hr className="border-ctp-surface1" />
					<div className="py-3 flex items-center justify-between">
						<div className="flex gap-4 text-xs text-ctp-subtext0">
							<a href="/about" className="hover:text-ctp-text">
								about
							</a>
							<a href="mailto:contact@axle.coffee" className="hover:text-ctp-text">
								contact
							</a>
							<a href="/rss.xml" className="hover:text-ctp-text">
								rss
							</a>
						</div>
						<div
							style={{
								width: 32,
								height: 14,
								borderRadius: 2,
								background: 'linear-gradient(to bottom, #078D70 0% 20%, #26CEAA 20% 40%, #FFFFFF 40% 60%, #7BADE2 60% 80%, #3D1A78 80% 100%)',
							}}
							title="gay"
						/>
						
					</div>
				</div>
			</footer>
		</>
	);
}
