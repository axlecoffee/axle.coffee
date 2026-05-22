import type { Metadata } from "next";
import "./globals.css";

const themeScript = `(function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light';})();window.setTheme=function(t){document.documentElement.dataset.theme=t==='light'?'light':'';localStorage.setItem('theme',t);};window.toggleTheme=function(){window.setTheme(document.documentElement.dataset.theme==='light'?'dark':'light');};`;

export const metadata: Metadata = {
	title: "axle.coffee",
	description: "meowing...",
	openGraph: {
		title: "axle.coffee",
		description: "yawning perhaps",
		type: "website",
		url: "https://axle.coffee",
	},
	twitter: {
		card: "summary",
		title: "axle.coffee",
		description: "yawning",
	},
	icons: {
		icon: "data:,",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className="bg-ctp-base text-ctp-text font-inconsolata flex flex-col min-h-screen">{children}</body>
		</html>
	);
}
