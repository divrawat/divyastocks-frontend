// functions/sitemap.xml.js

import { allblogs } from '../actions/blog';
import { DOMAIN } from "../config";
import { format, utcToZonedTime } from 'date-fns-tz';

const generateXmlSitemap = (blogs) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${DOMAIN}</loc>
        <priority>1.0</priority>
        <changefreq>daily</changefreq>
      </url>`;

    blogs.forEach((blog) => {
        const utcDate = new Date(blog.date);
        const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
        const formattedDate = format(istDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'Asia/Kolkata' });
        xml += `
      <url>
        <loc>${`${DOMAIN}/${blog.slug}`}</loc>
        <lastmod>${formattedDate}</lastmod>
      </url>`;
    });

    xml += '</urlset>';
    return xml;
};

export async function onRequest({ request }) {
    try {
        const blogs = await allblogs();
        const sitemapXml = generateXmlSitemap(blogs);

        return new Response(sitemapXml, {
            status: 200,
            headers: {
                'Content-Type': 'text/xml',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new Response('Error generating sitemap.', { status: 500 });
    }
}