/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://githubreader.org', // Replace with your site's URL
  generateRobotsTxt: true, // Generate a robots.txt file
  changefreq: 'weekly', // Change frequency of the sitemap
  priority: 0.7, // Default priority of the sitemap
  sitemapSize: 7000, // Split sitemap into multiple files if more than 7000 URLs
  exclude: [
    '/404', // Exclude 404 page from sitemap
    '/admin/*', // Example of excluding paths with wildcards
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://githubreader.org/sitemap.xml',
    ],
  },
};
