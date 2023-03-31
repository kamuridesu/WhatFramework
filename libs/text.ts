function parseTextWithQuotation(text: string): string[] {
	let words: string[] = [];
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
  
  function checkMentionsInText(text: string): string[] {
	const regex = /@[0-9]{12}/g;
	const matches = text.match(regex);
	if (matches) {
	  return matches.map((number) => number.replace("@", "") + "@s.whatsapp.net");
	}
	return [];
  }  
  
  function checkJidInTextAndConvert(text: string): { text: string; mentions: string[] } {
	const regex = /[0-9]{12}@s\.whatsapp\.net/;
	while (regex.test(text)) {
	  text = text.replace(regex, "@" + text.match(regex)![0].replace(/@s\.whatsapp\.net/, ""));
	}
	return {
	  text: text,
	  mentions: checkMentionsInText(text),
	};
  }
  
  export { parseTextWithQuotation, checkMentionsInText, checkJidInTextAndConvert };
  