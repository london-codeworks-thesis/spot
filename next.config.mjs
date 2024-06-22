/** @type {import('next').NextConfig} */
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withVercelToolbar()(nextConfig);
