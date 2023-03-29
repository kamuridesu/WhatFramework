// Methods for text handling

/**
 * @param {string} text 
 * @returns {Array<string>}
*/
function parseTextWithQuotation(text) {
	let words = [];
	let inQuotes = false;
	let currentWord = "";

	for (let i = 0; i < text.length; i++) {
		let char = text.charAt(i);

		if (char === '"') {
			inQuotes = !inQuotes;
			currentWord += char;
		} else if (char === " " && !inQuotes) {
			words.push(currentWord);
			currentWord = "";
		} else {
			currentWord += char;
		}
	}

	words.push(currentWord);
	return words;
}


export {
	parseTextWithQuotation
};
