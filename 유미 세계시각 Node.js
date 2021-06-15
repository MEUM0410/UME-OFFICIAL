client.on('message', message => {
	
if (message.content.toLowerCase() === '-세계시각') {
		var gmt = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
		var est = new Date().toLocaleString('en-US', {
			timeZone: 'America/New_York'
		});
		var pst = new Date().toLocaleString('en-US', {
			timeZone: 'America/Los_Angeles'
		});
		var cst = new Date().toLocaleString('en-US', {
			timeZone: 'America/Mexico_City'
		});
		var mst = new Date().toLocaleString('en-US', {
			timeZone: 'America/Phoenix'
		});
		var aest = new Date().toLocaleString('en-US', {
			timeZone: 'Australia/Sydney'
		});
		var awst = new Date().toLocaleString('en-US', {
			timeZone: 'Australia/Perth'
		});
		var kst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
		var ist = new Date().toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
		const worldClock = new Discord.MessageEmbed()
			.setAuthor('세계시각 - 타임존')
			.addField(':flag_eu: 런던 (GMT)', `${gmt}\n(GMT+0/GMT+1)`, true)

			.addField(':flag_us: 뉴욕 (EST)', `${est}\n(GMT-5)`, true)
			.addField(':flag_us: 로스엔젤레스 (PST)', `${pst}\n(GMT-8)`, true)
			.addField(':flag_au: 시드니 (AEST)', `${aest}\n(GMT+11)`, true)
			.addField(':flag_au: 퍼스 (AWST)', `${awst}\n(GMT+8)`, true)

			.addField(':flag_kr: 대한민국 (KST)', `${kst}\n(GMT+9)`, true)
			.addField(':flag_us: 멕시코 시티 (CST)', `${cst}\n(GMT-7)`, true)
			.addField(':flag_in: 인도 (IST)', `${ist}\n(GMT+05:30)`, true)
			.addField('\u200B', '\u200B', true)
			.setColor('BLUE');
		message.channel.send(worldClock);
	}
}
