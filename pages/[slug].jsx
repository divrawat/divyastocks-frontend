import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { singleBlog, allblogs } from '../actions/blog';
import { DOMAIN, APP_NAME } from "../config";
import SmallCard from '@/components/SmallCard';
import { isAuth } from '@/actions/auth';
import { format, utcToZonedTime } from 'date-fns-tz';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SingleBlogPost = ({ blog, errorCode, recentPosts }) => {


    if (errorCode) {
        return (
            <>
                <Navbar />
                <div className='dark:bg-[#090909] dark:text-white'>
                    <br />
                    <div className="flex justify-center items-center h-[70vh]">
                        <img src="/404.jpg" className="max-w-full max-h-full" alt="" />
                    </div>
                    <div className=' text-center font-bold text-5xl mt-5 pb-10'>Page Not Found</div>
                </div>
                <Footer />
            </>
        );
    }

    const [user, setUser] = useState(null);
    useEffect(() => { setUser(isAuth()) }, []);


    const showBlogCategories = () => {
        return (blog?.categories && blog?.categories?.map((c, i) => (
            <Link key={i} href={`/categories/${c?.slug}`}><button className='bg-red-600 text-[white] m-3 hover:scale-105 transition-transform font-bold rounded py-2 px-3'  >{c?.name}</button></Link>
        )))
    };


    function convertToReadable(timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const readableDate = date.toLocaleDateString('en-GB', options);  // 'en-GB' for "day month year" format
        return readableDate;
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


    const head = () => (
        <Head>
            <title >{`${blog?.title} - ${APP_NAME}`}</title>
            <meta name="description" content={blog?.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/${blog?.slug}`} />
            <meta property="og:title" content={`${blog?.mtitle}| ${APP_NAME}`} />
            <meta property="og:description" content={blog?.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={`${DOMAIN}/${blog?.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={blog?.photo} />
            <meta property="og:image:secure_url" content={blog?.photo} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="article:published_time" content={blog?.date} />
            <meta property="article:modified_time" content={blog?.date} />
        </Head>
    );



    return (
        <>
            {head()}
            <Navbar />

            <main className='bg-[white]'>
                <div className='max-w-[1400px] mx-auto pt-5 flex flex-col lg:flex-row gap-8 px-4'>
                    {/* Main Content */}
                    <article className='lg:w-3/4'>
                        <div className='md:p-1 p-5'>
                            <div>
                                <section>
                                    <section className='mx-auto'>
                                        {user && isAuth().role === 1 && (
                                            <div className='flex justify-end'>
                                                <a
                                                    className='bg-[#28113f] dark:bg-[#626161] py-1 px-3 font-bold rounded hover:scale-105 transition-transform text-[#89f379]'
                                                    href={`${DOMAIN}/admin/blog/${blog?.slug}`}
                                                >
                                                    Edit
                                                </a>
                                            </div>
                                        )}
                                        <header>
                                            <h1 className='font-extrabold md:text-4xl text-3xl mb-3 dark:text-[whitesmoke]' style={{ wordSpacing: "5px" }}>
                                                {blog?.title}
                                            </h1>
                                            <section>
                                                {blog?.formattedDate} &nbsp; by &nbsp;
                                                {blog?.postedBy && blog?.postedBy.name && blog?.postedBy.username ? (
                                                    <Link className='underline hover:text-[blue]' href={`/profile/${blog?.postedBy?.username}`}>
                                                        {blog?.postedBy?.name}
                                                    </Link>
                                                ) : (
                                                    <span>User</span>
                                                )}
                                            </section>
                                        </header>


                                        <section>
                                            <div className='mt-3 mb-8'>
                                                <img src={blog?.photo} alt={blog?.title} className='w-full h-auto rounded-lg' />
                                            </div>
                                        </section>
                                    </section>

                                    <section className="postcontent">
                                        <div dangerouslySetInnerHTML={{ __html: blog?.body }} />
                                        <div style={{ textAlign: "center" }}>
                                            {showBlogCategories()}
                                        </div>
                                    </section>
                                </section>
                            </div>
                        </div>
                    </article>


                    <aside className='lg:w-1/3 mt-10 ml-10'>
                        <div className='bg-white dark:bg-[#1e1e1e] rounded-lg'>
                            <aside className="lg:col-span-1">
                                <RecentPosts posts={recentPosts} />
                            </aside>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </>
    );

};



/*
export async function getStaticPaths() {
    const slugs = ["exploring-norway-a-journey-of-discovery", "europe's-most-popular-train-stations"];
    const paths = slugs.map(slug => ({ params: { slug } }));
    return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
    try {
        const data = await singleBlog(params.slug);
        if (data.error) { return { props: { errorCode: 404 } }; }
        const utcDate = new Date(data.blogpost.date);
        const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
        const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });
        return { props: { blog: { ...data.blogpost, relatedPosts: data.relatedPosts, formattedDate } } };
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}
*/



export async function getServerSideProps({ params }) {
    try {
        const mydata = await singleBlog(params.slug);
        const data = mydata?.data;
        const recentPosts = mydata.recentPosts;

        if (data.error) { return { props: { errorCode: 404 } }; }
        const utcDate = new Date(data?.date);
        const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
        const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });

        return { props: { blog: { ...data, formattedDate }, recentPosts: recentPosts } };
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}



export default SingleBlogPost;