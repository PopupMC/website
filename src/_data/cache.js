const Cache = require("@11ty/eleventy-cache-assets");

const isNetlify = (process.env.NETLIFY == true);

const cacheDir = (isNetlify)
	? "/tmp/.cache/"
	: ".cache";

async function cacheFunc(url, duration = "1d", type = "json", fetchOptions = undefined) {
	try {
		return Cache(url, {
			duration, // save for 1 day
			type,    // we’ll parse JSON for you
			directory: cacheDir,
			fetchOptions
		});
	}
	catch(e) {
		return null;
	}
};

module.exports = {
	cache: cacheFunc,
	async cacheImg(url, duration) {
		return cacheFunc(url, duration, "buffer");
	},

	async cacheFontCss(url, duration) {
		return cacheFunc(url, duration, "text");
	}
};
