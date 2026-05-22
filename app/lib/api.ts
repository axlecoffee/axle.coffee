import type { WeatherData, GitHubData } from '../types';

export async function fetchWeather(): Promise<WeatherData | null> {
	try {
		const res = await fetch('https://api.axle.coffee/v2/weather', { next: { revalidate: 300 } });
		if (!res.ok) return null;
		return (await res.json()) as WeatherData;
	} catch (err) {
		console.error('fetchWeather failed:', err);
		return null;
	}
}

export async function fetchGitHub(): Promise<GitHubData | null> {
	try {
		const res = await fetch('https://api.axle.coffee/v2/github?username=axlecoffee', { next: { revalidate: 3600 } });
		if (!res.ok) return null;
		return (await res.json()) as GitHubData;
	} catch (err) {
		console.error('fetchGitHub failed:', err);
		return null;
	}
}
