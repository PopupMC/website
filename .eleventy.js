module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/icons": "/" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};
