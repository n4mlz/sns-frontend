/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
};

const withPWA = require("next-pwa")({
    dest: "public",
    cacheOnFrontEndNav: true,
    reloadOnOnline: true,
    register: true,
    disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
