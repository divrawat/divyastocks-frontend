// pages/page/[pageNumber].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { format, utcToZonedTime } from 'date-fns-tz';
import { APP_NAME, APP_DESCRIPTION, DOMAIN } from "@/config";
import Pagination from '@/components/Pagination';
export const runtime = "experimental-edge";


function convertToReadable(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = date.toLocaleDateString('en-GB', options);  // 'en-GB' for "day month year" format
    return readableDate;
}





function BlogCard({ post }) {


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">

            <div className="relative h-40 bg-gray-200">
                <img src={post?.photo} alt={post?.title} className="w-full h-full object-cover" />

                <div className="absolute top-3 left-3">
                    <span className=" flex text-white text-xs font-medium rounded-full">
                        {post?.categories.map((cat) => {
                            return <div className="mr-1 p-1 bg-red-600 rounded-md">{cat?.name}</div>
                        })}
                    </span>
                </div>
            </div>


            <div className="p-4 flex-1 flex flex-col">

                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{convertToReadable(post.date)}</span>
                </div>


                <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    <a href={`${DOMAIN}/${post?.slug}`}>{post?.title}</a>
                </h2>


                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                    {post?.excerpt}
                </p>


                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                            <span className="text-xs font-medium text-gray-600">
                                <img src="/divyanshu.png" alt="" className="rounded-full" />
                            </span>

                        </div>
                        <span className="text-xs font-medium text-gray-700">
                            {post?.author}
                        </span>
                    </div>

                    <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                        <a href={`${DOMAIN}/${post?.slug}`}>  Read More →</a>
                    </button>
                </div>
            </div>
        </div>
    );
}

function RecentPosts({ posts }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Posts</h2>

            <div className="space-y-4">
                {posts?.map((post) => (
                    <article key={post._id}>
                        <div className="flex items-start space-x-4">

                            <div className="flex-shrink-0">
                                <div className="w-24 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <img src={`${post?.photo}`} className="object-cover" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 transition-colors line-clamp-2">
                                    <a href={`${DOMAIN}/${post?.slug}`} className="hover:text-red-700">{post.title}</a>
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {convertToReadable(post.date)}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-center text-red-600 hover:text-red-700 text-sm font-medium">
                    View All Posts →
                </button>
            </div>
        </div>
    );
}


const BlogPage = ({ blogs, pagination, recentPosts }) => {
    const router = useRouter();
    const { pageNumber } = router.query;
    const currentPage = parseInt(pageNumber) || 1;

    const head = () => (
        <Head>
            <title>{`${APP_NAME} Page ${currentPage}`}</title>
            <meta name="description" content={APP_DESCRIPTION} />
            <link rel="canonical" href={`${DOMAIN}${router.asPath}`} />
            <meta property="og:title" content={`${APP_NAME} - Page ${currentPage}`} />
            <meta property="og:description" content={APP_DESCRIPTION} />
            <meta property="og:type" content="website" />
            <meta name="robots" content={currentPage === 1 ? 'index, follow' : 'noindex, follow'} />
            <meta property="og:url" content={`${DOMAIN}${router.asPath}`} />
            <meta property="og:site_name" content={DOMAIN} />
            <meta property="og:image" content={`${DOMAIN}/icon-512.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/icon-512.png`} />
            <meta property="og:image:type" content="image/jpg" />

            {pagination?.hasPrevPage && (<link rel="prev" href={`${DOMAIN}/page/${currentPage - 1}`} />)}
            {pagination?.hasNextPage && (<link rel="next" href={`${DOMAIN}/page/${currentPage + 1}`} />)}
        </Head>
    );

    return (
        <>
            <Navbar />
            {head()}
            <div className="min-h-screen bg-gray-100 p-5">
                <main className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            {/* Page indicator */}
                            {currentPage > 1 && (
                                <div className="mb-4 text-gray-600">
                                    {`Page ${currentPage} of ${pagination?.totalPages}`}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {blogs.map((post) => (
                                    <BlogCard key={post._id} post={post} />
                                ))}
                            </div>

                            {/* Pagination Component */}
                            {pagination && pagination.totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={pagination.totalPages}
                                    basePath="/page"
                                />
                            )}
                        </div>

                        <aside className="lg:col-span-1">
                            <RecentPosts posts={recentPosts} />
                        </aside>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export async function getServerSideProps(context) {
    try {
        const page = Number(context.params.pageNumber) || 1;
        const data = await listBlogsWithCategoriesAndTags(page);

        const formattedBlogs = data?.blogs?.map(blog => {
            const utcDate = new Date(blog.date);
            const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
            const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });
            return { ...blog, formattedDate };
        });

        return {
            props: {
                blogs: formattedBlogs || [],
                pagination: data?.pagination || null,
                recentPosts: data?.recentPosts
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                blogs: [],
                pagination: null
            }
        };
    }
}

export default BlogPage;