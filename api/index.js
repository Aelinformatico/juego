const fs = require('fs');
const path = require('path');

const STATIC = {
	'/': ['index.html', 'text/html; charset=utf-8'],
	'/index.html': ['index.html', 'text/html; charset=utf-8'],
	'/client.js': ['client.js', 'text/javascript; charset=utf-8'],
	'/style.css': ['style.css', 'text/css; charset=utf-8'],
};

module.exports = (req, res) => {
	const file = STATIC[req.url.split('?')[0]];

	if (!file) {
		res.statusCode = 404;
		return res.end('No encontrado');
	}

	fs.readFile(path.join(process.cwd(), 'public', file[0]), (err, data) => {
		if (err) {
			res.statusCode = 500;
			return res.end('Error');
		}

		res.writeHead(200, {
			'Content-Type': file[1],
			'Cache-Control': 'no-cache',
		});
		res.end(data);
	});
};
