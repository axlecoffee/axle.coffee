import ThemeToggle from "./ThemeToggle";

export default function Nav() {
	return (
		<nav className="sticky top-0 bg-ctp-base z-10">
		<div className="max-w-5xl mx-auto px-2">
			<div className="py-3 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<span className="font-ibm text-ctp-mauve font-bold text-sm leading-none">axle.coffee</span>
					<div className="font-ibm flex gap-4 text-sm leading-none text-ctp-subtext1">
						<a href="/about" className="hover:text-ctp-text">about</a>
						<a href="/projects" className="hover:text-ctp-text">projects</a>
						<a href="/photos" className="hover:text-ctp-text">photos</a>
						<a href="/blog" className="hover:text-ctp-text">blog</a>
					</div>
				</div>
				<ThemeToggle />
			</div>
			<hr className="border-ctp-surface1" />
		</div>
		</nav>
	);
}
