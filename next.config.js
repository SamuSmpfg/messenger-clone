module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('pusher-js');
    }
    return config;
  },
};