// server.js
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

import { fileURLToPath } from 'url';
const app = express();
const port = 3001;

// Create __dirname variable for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Route to handle translation saving
app.post('/save-translations', (req, res) => {
	const { lang, translations } = req.body;
	// console.log('hloo');
	// console.log(req.body);

	const dirPath = path.join(__dirname, '../public/locales', lang);
	console.log(dirPath);
	// Ensure the directory exists
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}

	const filePath = path.join(dirPath, 'translation.json');
	console.log(filePath);
	const jsonData = JSON.stringify(translations, null, 2);
	console.log(jsonData);
	fs.writeFile(filePath, jsonData, err => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error saving translation file.');
		}
		res.send(`Translation file for ${lang} has been saved.`);
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
