const axios = require('axios');
const Task = require('../../src/task');

class PostWeather extends Task {
	constructor() {
		super();
		this.cronTime = '00 00 06 * * *';
	}

	task(hellBot) {
		let location = '50.7359,7.1007'; // Bonn
		const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${location}?lang=de&units=auto&exclude=minutely,hourly`;

		axios.get(url)
			.then(({ data }) => {
				this.$store.get('guild').systemChannel.send({
					embed: {
						color: 0xf5f5f5,
						title: 'Powered by Dark Sky',
						url: 'https://darksky.net/poweredby/',
						description: 'Bonn',
						thumbnail: {
							url: `https://darksky.net/images/weather-icons/${data.daily.data[0].icon}.png`,
						},
						fields: [
							{
								name: `${Math.round(data.daily.data[0].temperatureLow)} - ${Math.round(data.daily.data[0].temperatureHigh)}°C`,
								value: data.daily.data[0].summary,
							},
							{
								name: '<:umbrella:697719018668425216>',
								value: `${data.daily.data[0].precipProbability * 100}%`,
								inline: true,
							},
							{
								name: '<:dash:697719113702965255>',
								value: `${data.daily.data[0].windSpeed}mph`,
								inline: true,
							},
						],
					}
				});
			})
			.catch(error => {
				console.error(error);
			})
		;
	}
}

module.exports = PostWeather;
