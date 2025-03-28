/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
        events: require.resolve('events/'),
        http: require.resolve('stream-http'),
      };
      return config;
    },
  };
  
  export default nextConfig;
  