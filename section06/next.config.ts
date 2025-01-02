import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shopping-phinf.pstatic.net',
                pathname: '**',
            }
        ]
    }
};

export default nextConfig;
