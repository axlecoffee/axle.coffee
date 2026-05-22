import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const LEGACY_UA_PATTERNS: readonly RegExp[] = [
	/Windows\s(95|98|NT\s4)/i,
	/Netscape\/[34]\./i,
	/Netscape\//i,
	/Mozilla\/[34]\..*Gold/i,
	/Opera\/[45678]\./i,
	/MSIE\s\d/i,
	/Trident\/\d/i,
	/compatible;\s*MSIE/i,
];

const OLDNET_PATH = '/oldnet/home.html';

export function proxy(request: NextRequest): NextResponse {
	const ua = request.headers.get('user-agent') ?? '';
	const isLegacy = LEGACY_UA_PATTERNS.some((re) => re.test(ua));

	if (isLegacy) {
		return NextResponse.redirect(new URL(OLDNET_PATH, request.url));
	}

	return NextResponse.next();
}

export const config = {
	// Run on all app routes; skip Next.js internals, static assets, and the
	// oldnet pages themselves (prevent redirect loop).
	matcher: ['/((?!_next/static|_next/image|favicon\\.ico|oldnet).*)'],
};
