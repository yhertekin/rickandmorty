/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/location?page=1",
            },
        ];
    },

    async redirects() {
        return [
            {
                source: "/",
                destination: "/location?page=1",
                statusCode: 301,
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rickandmortyapi.com",
            },
        ],
    },

    output: "standalone",
};

module.exports = nextConfig;
