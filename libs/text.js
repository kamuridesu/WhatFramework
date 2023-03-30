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

function checkMentionsInText(text) {
    const regex = /@[0-9]{12}/g;
    if(regex.test(text)) {
        return text.match(regex).map(number => number.replace("@", "") + "@s.whatsapp.net");
    }
    return "";
}


function checkJidInTextAndConvert(text) {
	const regex = /[0-9]{12}@s\.whatsapp\.net/;
	while (regex.test(text)) {
		text = text.replace(regex, "@" + text.match(regex)[0].replace(/@s\.whatsapp\.net/, ""));
	}
	return {
		text: text,
		mentions: checkMentionsInText(text)
	};
}


export {
	parseTextWithQuotation, checkMentionsInText, checkJidInTextAndConvert
};
