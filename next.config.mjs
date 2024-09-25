/** @type {import('next').NextConfig} */
import pkg from 'webpack'
const { ProvidePlugin } = pkg
const nextConfig = {
  // Add Webpack customization here
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    )

    // Return the updated config object
    return config
  },
}

// Export the configuration
export default nextConfig
