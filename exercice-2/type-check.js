const type_check_v1 = (obj, type) => (typeof obj).toLowerCase() === type;

const type_check_v2 = (obj, { type, value }) =>
	type_check_v1(obj, type) && obj == value;
