const verifyStringType = str => typeof str !== "string" || !str;

function ucfirst(str) {
	if (verifyStringType(str)) return "";

	return str[0].toUpperCase() + str.substring(1);
}

function capitalize(str) {
	if (verifyStringType(str)) return "";

	return str
		.toLowerCase()
		.replace(/[\s+_!@#$%^&*(),.?":{}|<>]/g, " ")
		.split(" ")
		.map(word => ucfirst(word))
		.join(" ");
}

const camelCase = str => {
	if (verifyStringType(str)) return "";
	return capitalize(str).replace(/[\s+]/g, "");
};

const snake_case = str => {
	if (verifyStringType(str)) return "";

	return str.toLowerCase().replace(/\s/g, "_");
};

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

const verlan = str => {
	if (verifyStringType(str)) return "";

	return str
		.split(" ")
		.map(word => [...word].reverse().join(""))
		.join(" ");
};

const yoda = str => {
	if (verifyStringType(str)) return "";

	return str
		.split(/\s/g)
		.reverse()
		.join(" ");
};

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
