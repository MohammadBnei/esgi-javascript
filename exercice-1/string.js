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

console.log("Capitalize");
console.log(capitalize("test"));
console.log(capitalize("Test"));
console.log(capitalize(" test"));
console.log(capitalize("test TEst tst"));
console.log(capitalize(""));
console.log(capitalize(null));
console.log(capitalize({}));

const camelCase = str => {
	if (verifyStringType(str)) return "";
	return capitalize(str).replace(/[\s+_!@#$%^&*(),.?":{}|<>]/g, "");
};

console.log("Camel Case");
console.log(camelCase("test"));
console.log(camelCase("Test"));
console.log(camelCase(" test"));
console.log(camelCase("test TE2st_tst"));
console.log(camelCase(""));
console.log(camelCase(null));
console.log(camelCase({}));

const snake_case = str => {
	if (verifyStringType(str)) return "";

	return str.toLowerCase().replace(/\s/g, "_");
};

console.log("Snake Case");

console.log(snake_case("test"));
console.log(snake_case("Test"));
console.log(snake_case(" test"));
console.log(snake_case("test TEst tst"));
console.log(snake_case(""));
console.log(snake_case(null));
console.log(snake_case({}));
