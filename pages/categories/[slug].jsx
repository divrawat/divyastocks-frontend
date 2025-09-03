import Head from 'next/head';
import { useRouter } from 'next/router';
import { singleCategory } from '../../actions/category';
import { DOMAIN, APP_NAME, APP_DESCRIPTION } from '../../config';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Pagination2 from '@/components/Pagination2';
export const runtime = "experimental-edge";

const Category = ({ category, blogs, pagination, query, errorCode }) => {
    const router = useRouter();
    const currentPage = parseInt(router.query.page) || 1;

    if (errorCode) {
        return (
            <>
                <Navbar />
                <div>
                    <br />
                    <div className="flex justify-center items-center h-[70vh]">
                        <img src="/images/404.jpg" className="max-w-full max-h-full" alt="" />
                    </div>
                    <div className=' text-center font-bold text-5xl mb-10'>Page Not Found</div>
                </div>
                <Footer />
            </>
        );
    }



    const schema = {
        "@context": "[https://schema.org](https://schema.org)",
        "@graph": [
            {
                "@type": "NewsMediaOrganization",
                "name": APP_NAME,
                "url": DOMAIN,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${DOMAIN}/logo.jpg`,
                    "height": "50",
                    "width": "50"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": `${DOMAIN}/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": category?.name,
                        "item": `${DOMAIN}/categories/${query.slug}?page=${currentPage}`,
                    }
                ]
            },
            {
                "@type": "CollectionPage",
                "name": category?.name,
                "description": category?.description,
                "url": `${DOMAIN}/categories/${query.slug}?page=${currentPage}`,
                "inLanguage": "hi-IN"
            },
            {
                "@type": "WebSite",
                "url": DOMAIN,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${DOMAIN}/search?s={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    };






    const head = () => (
        <Head>
            <title>{`${category.name} - Page ${currentPage} | ${APP_NAME}`}</title>
            <meta name="description" content={APP_DESCRIPTION} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}?page=${currentPage}`} />
            <meta property="og:title" content={`${category.name} - Page ${currentPage} | ${APP_NAME}`} />
            <meta name="robots" content="index, follow" />
            <meta property="og:description" content={APP_DESCRIPTION} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}?page=${currentPage}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/logo.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/logo.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head>
    );

    const handlePageChange = (page) => {
        router.push({
            pathname: `/categories/${query.slug}`,
            query: { page: page }
        });
    };


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
                            {post?.categories.map((cat, i) => {
                                return <div key={i} className="mr-1 p-1 bg-red-600 rounded-md"><a href={`${DOMAIN}/categories/${cat?.slug}`}>{cat?.name}</a></div>
                            })}
                        </span>
                    </div>
                </div>


                <div className="p-4 flex-1 flex flex-col">

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{convertToReadable(post.date)}</span>
                    </div>


                    <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        <a href={`${DOMAIN}/${post?.slug}`} className="hover:text-red-700">{post?.title}</a>
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

                        <button className="text-red-600 hover:text-red-700 text-xs font-medium">
                            <a href={`${DOMAIN}/${post?.slug}`}>  Read More →</a>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {head()}
            <Navbar />
            <main className='dark:bg-[#10141c] dark:text-[#cecdcd] min-h-screen'>
                <div className="container mx-auto px-4 py-8">
                    <h1 className='text-3xl font-bold text-center py-5 dark:text-white'>{category.name}</h1>
                    {/* <div className='text-center mb-5'>
                        Total Articles - <span className='font-bold'>{pagination?.totalBlogs || 0}</span>
                    </div> */}

                    <div className='max-w-[1200px] flex sm:gap-[70px] gap-5 md:mt-10 mt-3 pb-5 justify-center mx-auto flex-wrap'>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {blogs.map((post) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="mt-8">
                            <Pagination2
                                currentPage={currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                                basePath={`/categories/${query.slug}`}
                            />
                        </div>
                    )}
                </div>
                <br /> <br />
            </main>
            <Footer />
        </>
    );
};

export async function getServerSideProps({ query, res }) {
    try {
        const page = Number(query.page) || 1;
        const data = await singleCategory(query.slug, page);

        if (data.error || !data.category) {
            res.statusCode = 404;
            return { props: { errorCode: 404 } };
        }

        const formattedBlogs = data.blogs.map(blog => ({
            ...blog,
            formattedDate: format(new Date(blog.date), 'dd MMMM, yyyy')
        }));

        return {
            props: {
                category: data.category,
                blogs: formattedBlogs,
                pagination: data.pagination,
                query
            }
        };
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}

export default Category;