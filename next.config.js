/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:['lh3.googleusercontent.com']
  }
}



module.exports = nextConfig
