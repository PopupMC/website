const Image = require("@11ty/eleventy-img"),
      Cache = require("@11ty/eleventy-cache-assets");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [64, 128, 256, 512, 1024, 2048, null],
    formats: ["svg", "avif", "webp", "jpeg"],
    urlPath: "/img/",
    outputDir: "./_site/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
}

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/icons": "/" });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};
