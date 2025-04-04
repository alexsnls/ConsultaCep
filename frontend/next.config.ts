/** @type {import('next').NextConfig} */
interface WebpackConfig {
  
}

interface NextConfig {
  webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig): WebpackConfig => {
    return config;
  },
};

module.exports = nextConfig;
