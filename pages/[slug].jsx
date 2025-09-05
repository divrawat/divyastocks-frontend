import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { singleBlog, allblogs } from '../actions/blog';
import { DOMAIN, APP_NAME, logolink, APP_DESCRIPTION } from "../config";
import SmallCard from '@/components/SmallCard';
import { isAuth } from '@/actions/auth';
import { format, utcToZonedTime } from 'date-fns-tz';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorBox from '@/components/AuthorBox';
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaRedditAlien } from "react-icons/fa";
import slugify from 'slugify';
export const runtime = "experimental-edge";

const SingleBlogPost = ({ blog, errorCode, recentPosts }) => {

    const title = blog?.title;
    const slug = blog?.slug;
    const url = `${DOMAIN}/${blog?.slug}`
    const description = blog?.mdesc;
    const photo = blog?.photo;
    const date = blog?.date;
    const author = blog?.author;

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


    const SocialMedia = () => {




        const whatsappUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        const telegramUrl = `https://telegram.me/share/url?text=${title}&url=${url}`;
        const redditUrl = `https://www.reddit.com/submit?title=${title}&url=${url}`;

        return (
            <section className="flex gap-4 flex-wrap text-white mb-3">


                <a href={facebookUrl} className="flex gap-1 items-center bg-blue-600 rounded-md px-2 py-1">
                    <span><FaFacebook /></span>
                    <span className={` text-[12px]`}>FaceBook</span>
                </a>

                <a href={redditUrl} className="flex gap-1 items-center bg-orange-500 rounded-md px-2 py-1">
                    <span className="pb-[3px]"><FaRedditAlien /></span>
                    <span className={` text-[12px]`}>Reddit</span>
                </a>

                <a href={twitterUrl} className="flex gap-1 items-center bg-blue-500 rounded-md px-2 py-1">
                    <span><FaTwitter /></span>
                    <span className={`text-[12px]`}>Twitter</span>
                </a>

                <a href={telegramUrl} className="flex gap-1 items-center bg-blue-600 rounded-md px-2 py-1">
                    <span><FaTelegram /></span>
                    <span className={` text-[12px]`}>Telegram</span>
                </a>

                <a href={whatsappUrl} className="flex gap-1 items-center bg-green-500 rounded-md px-2 py-1">
                    <span><IoLogoWhatsapp /></span>
                    <span className={` text-[12px]`}>WhatsApp</span>
                </a>

            </section>
        )
    }


    const showBlogCategories = () => {
        return (blog?.categories && blog?.categories?.map((c, i) => (
            <Link key={i} href={`/categories/${c?.slug}`}><button className='bg-[#0f5c7d] text-[white] m-3 hover:scale-105 transition-transform font-bold rounded py-2 px-3'  >{c?.name}</button></Link>
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
                                        <a href={`${DOMAIN}/${post?.slug}`} className="hover:text-[#0A4158]">{post.title}</a>
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
                    <button className="w-full text-center text-[#0f5c7d] hover:text-[#0A4158] text-sm font-medium">
                        View All Posts →
                    </button>
                </div>
            </div>
        );
    }

    /*
        
        const schema00 = {
            "@context": "[https://schema.org](https://schema.org)",
            "@graph": [
                {
                    "@type": "NewsArticle",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `${DOMAIN}/${blog?.slug}`
                    },
                    "headline": blog?.title,
                    "image": [blog?.photo],
                    "datePublished": blog?.date,
                    "dateModified": blog?.date,
                    "author": {
                        "@type": "Person",
                        "name": blog?.author
                    },
                    "publisher": {
                        "@type": "NewsMediaOrganization",
                        "name": APP_NAME,
                        "logo": {
                            "@type": "ImageObject",
                            "url": `${DOMAIN}/logo.jpg`,
                            "width": 50,
                            "height": 50
                        }
                    },
                    "description": blog?.mdesc,
                    "inLanguage": "hi-IN"
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
                            "position": 3,
                            "name": blog?.title,
                            "item": `${DOMAIN}/${blog?.slug}`
                        }
                    ]
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
    */






    const authorprofiles = {
        "Divyanshu Rawat": "divyanshu-rawat",
        "Ravi Pundir": "ravi-pundir",
    };

    const authorprofile = authorprofiles[author];
    const authorlinkpage = `${DOMAIN}/profile/${authorprofile}`



    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description: description,
            url: url,
            keywords: "News, Market, Crypto, IPO",
        },
        {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": url,
                description: description,
                thumbnailUrl: photo,
            },
            headline: title,
            inLanguage: "hi",
            image: {
                "@type": "ImageObject",
                url: photo,
                height: "1200",
                width: "1200",
            },
            datePublished: date,
            dateModified: date,
            author: {
                "@type": "Person",
                name: author,
                url: authorlinkpage,
            },
            publisher: {
                "@type": "NewsMediaOrganization",
                name: APP_NAME,
                logo: {
                    "@type": "ImageObject",
                    url: logolink,
                    height: "50",
                    width: "50",
                },
            },
            description: description,
            keywords: "News, Market, Crypto, IPO",
        },
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: APP_NAME,
            address: "2805, Sector 62, Mohali, Punjab",
            telephone: "9988177179",
            openingHours: ["Mo-Su 00:00-23:59"],
            description: APP_DESCRIPTION,
            image: logolink,
            url: DOMAIN,
        },
        {
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            name: APP_NAME,
            url: url,
            logo: {
                "@type": "ImageObject",
                url: logolink,
                height: "50",
                width: "50",
            },
        },
    ];





    const head = () => (
        <Head>
            <title >{`${title} - ${APP_NAME}`}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:title" content={`${title} | ${APP_NAME}`} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:image" content={photo} />
            <meta property="og:image:secure_url" content={photo} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="article:published_time" content={date} />
            <meta property="article:modified_time" content={date} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head>
    );



    return (
        <>
            {head()}
            <Navbar />

            <main className='bg-[white]'>
                <div className='max-w-[1400px] mx-auto pt-5 flex flex-col lg:flex-row gap-8 px-4'>

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
                                            {SocialMedia()}
                                            <h1 className='font-extrabold md:text-[35px] text-[25px] mb-3 dark:text-[whitesmoke]' style={{ wordSpacing: "5px" }}>
                                                {blog?.title}
                                            </h1>

                                            <section>
                                                {blog?.formattedDate} &nbsp; by &nbsp;
                                                {blog?.author ? (
                                                    <Link className='underline hover:text-[blue]' href={`/profile/${slugify(blog?.author).toLowerCase()}`}>
                                                        {blog?.author}
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
                                        <div>
                                            {showBlogCategories()}
                                        </div>
                                    </section>
                                </section>
                            </div>
                        </div>

                        <section className='my-10'>
                            <div className='text-[25px] font-bold  text-center md:text-left'>About The Author</div>
                            <AuthorBox selectedAuthorName={blog?.author} />
                        </section>


                    </article>


                    <aside className='lg:w-1/3 mt-10 md:ml-10'>
                        <div className='bg-white dark:bg-[#1e1e1e] rounded-lg'>
                            <div className="lg:col-span-1">
                                <RecentPosts posts={recentPosts} />
                            </div>
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