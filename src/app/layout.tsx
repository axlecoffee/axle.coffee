import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';
import './globals.css';
import BrowserDetection from '@/components/BrowserDetection';

/**
 * Google Font configuration for Inter font family
 */
const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400'],
	display: 'swap',
});

/**
 * Google Font configuration for Raleway font family
 */
const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-raleway',
	weight: ['400'],
	display: 'swap',
});

/**
 * Site metadata configuration for SEO and social sharing
 */
export const metadata: Metadata = {
	title: 'Browsing axle.coffee',
	description: 'Personal Website',
	icons: 'https://cdn.axle.coffee/raw/f4a3e6da.png',
	openGraph: {
		title: "Axle's Coffee - The Website!",
		description:
			"Meow Meow Meow\nThis website is Most likely using https://pandy.coffee's head as an armrest",
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: "Axle's Coffee - The Website!",
		description:
			"Meow Meow Meow\nThis website is Most likely using https://pandy.coffee's head as an armrest",
	},
	authors: [{ name: 'Axle Duggan' }],
};

/**
 * Viewport configuration for responsive design
 */
export const viewport = {
	width: 'device-width',
	initialScale: 1.0,
};

/**
 * Root layout component that wraps all pages with common HTML structure
 * @param children - Child components to render within the layout
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<script src="https://unpkg.com/akar-icons-fonts" async></script>
				{/* Fallback Google Fonts for production reliability */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Raleway:wght@400&display=swap"
				/>
			</head>
			<body className={`${inter.variable} ${raleway.variable}`}>
				<BrowserDetection />
				{children}
			</body>
		</html>
	);
}
