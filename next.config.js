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
};

module.exports = nextConfig;
