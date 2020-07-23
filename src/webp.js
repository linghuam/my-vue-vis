var imagemin = require("imagemin"),    // The imagemin module.
  imageminWebp = require("imagemin-webp"),   // imagemin's WebP plugin.
  outputFolder = "./img",            // Output folder
  PNGImages = "./img/*.png",         // PNG images
  JPEGImages = "./img/*.jpg";        // JPEG images

imagemin(['img/*'], {
  destination: 'compressed_images',
  plugins: [imageminWebp({lossless: true})]
}).then(() => {
  console.log('Done!');
});