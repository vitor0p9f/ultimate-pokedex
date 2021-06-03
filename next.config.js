/* eslint @typescript-eslint/no-var-requires: "off" */
const withImages = require('next-images')
module.exports = withImages()

module.exports = {
  images: {
    domains: ['raw.githubusercontent.com']
  }
}
