import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import Head from "next/head";
import { useState, useEffect } from "react";
import { listBlogsWithCategoriesAndTags } from "../actions/blog";
import { format, utcToZonedTime } from 'date-fns-tz';
import { APP_NAME, APP_DESCRIPTION, DOMAIN } from "@/config";



function BlogCard({ post }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">

            <div className="relative h-40 bg-gray-200">
                <img src={post?.photo} alt={post?.title} className="w-full h-full object-cover" />

                <div className="absolute top-3 left-3">
                    <span className=" flex text-white text-xs font-medium rounded-full">
                        {post?.categories.map((cat) => {
                            return <div className="mr-1 p-1 bg-[#0f5c7d] rounded-md">{cat?.name}</div>
                        })}
                    </span>
                </div>
            </div>


            <div className="p-4 flex-1 flex flex-col">

                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                </div>


                <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {post?.title}
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
                            {post?.postedBy?.name}
                        </span>
                    </div>

                    <button className="text-[#0f5c7d] hover:text-[#0A4158] text-xs font-medium">
                        <a href={post?.slug}>  Read More →</a>
                    </button>
                </div>
            </div>
        </article>
    );
}

function RecentPosts({ posts }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <aside className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Posts
            </h2>

            <div className="space-y-4">
                {posts.map((post) => (
                    <article key={post._id} className="group">
                        <div className="flex items-start space-x-4">

                            <div className="flex-shrink-0">
                                <div className="w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <img src={`${post?.photo}`} className="object-cover" />
                                </div>
                            </div>


                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {post.category}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>


            <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All Posts →
                </button>
            </div>
        </aside>
    );
}




export default function Home({ initialBlogs, initialPagination }) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [pagination, setPagination] = useState(initialPagination);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handlePageChange = async (page) => {
        setLoading(true);
        try {
            const data = await listBlogsWithCategoriesAndTags(page);

            const formattedBlogs = data?.blogs?.map(blog => {
                const utcDate = new Date(blog.date);
                const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
                const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });
                return { ...blog, formattedDate };
            });

            setBlogs(formattedBlogs);
            setPagination(data.pagination);
            setCurrentPage(page);

            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const head = () => (
        <Head>
            <title>{APP_NAME}</title>
            <meta name="description" content={APP_DESCRIPTION} />
            <link rel="canonical" href={DOMAIN} />
            <meta property="og:title" content={APP_NAME} />
            <meta property="og:description" content={APP_DESCRIPTION} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={DOMAIN} />
            <meta property="og:site_name" content={DOMAIN} />
            <meta property="og:image" content={`${DOMAIN}/icon-512.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/icon-512.png`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    return (
        <>
            <Navbar />
            {head()}
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto px-4 py-8">
                    {loading && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-4 rounded-lg">
                                <p className="text-lg">Loading...</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
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
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <RecentPosts posts={blogs.slice(0, 10)} />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}






export async function getServerSideProps(context) {
    try {
        const page = Number(context.query.page) || 1;
        const data = await listBlogsWithCategoriesAndTags(page);

        const formattedBlogs = data?.blogs?.map(blog => {
            const utcDate = new Date(blog.date);
            const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
            const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });
            return { ...blog, formattedDate };
        });

        return {
            props: {
                initialBlogs: formattedBlogs || [],
                initialPagination: data?.pagination || null
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                initialBlogs: [],
                initialPagination: null
            }
        };
    }
}
