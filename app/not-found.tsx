import Nav from './components/Nav';

export default function NotFound() {
	return (
		<>
			<Nav />
			<main className="max-w-5xl mx-auto px-2 py-6 flex-1">
				<div
					className="p-4"
					style={{
						border: '1px solid var(--ctp-red)',
						boxShadow: 'inset 0 0 0 1px color-mix(in oklch, var(--ctp-red) 45%, transparent)',
					}}
				>
					<h2 className="font-ibm text-ctp-subtext0 text-xs uppercase tracking-widest mb-3">404</h2>
					<p className="text-ctp-text text-sm">this page does not exist.</p>
					<p className="text-ctp-subtext0 text-xs mt-2">
						&#62;{' '}
						<a href="/" className="text-ctp-red hover:text-ctp-text underline">
							go home
						</a>
					</p>
				</div>
			</main>
		</>
	);
}
