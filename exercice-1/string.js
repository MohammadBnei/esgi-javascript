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
		.replace(/[\s+_!@#$%^&*(),.?":{}|<>]/g, " ")
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
	return capitalize(str).replace(/[\s+]/g, "");
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

const leet = str => {
	if (verifyStringType(str)) return "";
	return str.replace(/[aeiouy]/gi, item => {
		switch (item) {
			case "a":
			case "A":
				return "4";
			case "e":
			case "E":
				return "3";
			case "i":
			case "I":
				return "1";
			case "o":
			case "O":
				return "0";
			case "u":
			case "U":
				return "(_)";
			case "y":
			case "Y":
				return "7";
			default:
				return item;
		}
	});
};

console.log("Leet");
console.log(leet("anaconda"));

const prop_access = (obj, path) => {
	if (verifyStringType(path)) return obj;

	try {
		const splittedPath = path.split(".");
		let curObj = { ...obj };

		for (let i = 0; i < splittedPath.length; i++) {
			curObj = curObj[splittedPath[i]];
		}

		return curObj || path;
	} catch (error) {
		return path;
	}
};

const prairie = {
	animal: {
		courgette: "momo",
	},
};

console.log("Prop_access");
console.log(prop_access(prairie, "animal.courgette"));
console.log(prop_access(prairie, "animal.courgette.vert.bleu"));

const verlan = str => {
	if (verifyStringType(str)) return "";

	return str
		.split(" ")
		.map(word => [...word].reverse().join(""))
		.join(" ");
};

console.log("Verlan");
console.log(verlan("anaconda zebi"));

const yoda = str => {
	if (verifyStringType(str)) return "";

	return str
		.split(/\s/g)
		.reverse()
		.join(" ");
};

console.log("Yoda");
console.log(yoda("Hello world"));

const vig = (str, key) => {
	if (verifyStringType(str) || verifyStringType(key)) return "";

	const toAlphabetCode = letter => letter.charCodeAt(0) - 97;
	const keyGenerator = (function*() {
		let i = 0;
		const lowKey = key.toLowerCase();
		while (true) {
			yield lowKey.charCodeAt(i) - 97;
			i++;
			if (i === key.length) i = 0;
		}
	})();

	return [...str.toLowerCase()]
		.map(letter => {
			if (letter.match(/[^A-Za-z0-9]/)) return letter;
			const char = toAlphabetCode(letter);
			return String.fromCharCode(((char + keyGenerator.next().value) % 26) + 97);
		})
		.join("");
};

console.log("Vig");
console.log(vig("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.", "abc"));
