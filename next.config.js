/** @type {import('next').NextConfig} */
const nextConfig = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            reactStrictMode: true,
            env: {
                mongoUsername: "sameer",
                mongoPassword: "sameer123",
                mongoCluster: "cluster0",
                mongoDatabase: "blog",
            }
        }
    } else if (process.env.NODE_ENV === 'production') {
        return {
            env: {
                mongoUsername: "sameer",
                mongoPassword: "sameer123",
                mongoCluster: "cluster0",
                mongoDatabase: "blog",
            }
        }
    }
}

module.exports = nextConfig
