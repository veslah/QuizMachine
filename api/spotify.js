if (process.env.NODE_ENV !== 'production') {
	import('dotenv').then((module) => module.config());
}

console.log('it might work');
