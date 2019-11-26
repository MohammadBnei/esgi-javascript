const verifyStringType = str => typeof str !== "string" || !str;

function ucfirst(str) {
	if (verifyStringType(str)) return "";

	return str[0].toUpperCase() + str.substring(1);
}

console.log(ucfirst("test"));
console.log(ucfirst("Test"));
console.log(ucfirst(" test"));
console.log(ucfirst("test Test tst"));
console.log(ucfirst(""));
console.log(ucfirst(null));
console.log(ucfirst({}));

function capitalize(str) {
	if (verifyStringType(str)) return "";

	return str
		.toLowerCase()
		.split(" ")
		.map(word => ucfirst(word))
		.join(" ");
}

console.log(capitalize("test"));
console.log(capitalize("Test"));
console.log(capitalize(" test"));
console.log(capitalize("test TEst tst"));
console.log(capitalize(""));
console.log(capitalize(null));
console.log(capitalize({}));

const camelCase = str => {
	if (verifyStringType(str)) return "";
	return capitalize(str)
		.split(" ")
		.join("");
};

console.log(camelCase("test"));
console.log(camelCase("Test"));
console.log(camelCase(" test"));
console.log(camelCase("test TEst tst"));
console.log(camelCase(""));
console.log(camelCase(null));
console.log(camelCase({}));
