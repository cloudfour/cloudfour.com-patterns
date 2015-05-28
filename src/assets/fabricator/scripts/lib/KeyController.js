import shortcut from 'keyboard-shortcut';

export default function (keys, callback) {
	const options = {
		ms: 800,
		el: window,
		stopPropagation: false,
		preventDefault: false
	};
	return shortcut(keys, options, callback);
};
