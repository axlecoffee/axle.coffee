export interface WeatherData {
	location: { latitude: number; longitude: number };
	timestamp: string;
	data: {
		temperature: number;
		temperatureUnit: string;
		feels: number;
		feelsUnit: string;
		visibility: number;
		visibility_symbol: string;
		wind: number;
		windDirection: string;
		gusts: number;
		pressure: number;
		pressureDirection: string;
		pressureUnit: string;
		humidity: number;
	};
	cached: boolean;
	source: string;
}

export interface GitHubData {
	username: string;
	total_commits: number;
	total_issues: number;
	contributed_to: number;
	total_prs: number;
	total_stars_earned: number;
	commits: {
		day_current: number;
		day_last: number;
		week_current: number;
		week_last: number;
		month_current: number;
		month_last: number;
		quarter_current: number;
		quarter_last: number;
		year_current: number;
		year_last: number;
	};
	cached: boolean;
}
