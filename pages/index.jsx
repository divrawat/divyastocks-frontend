import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import Head from "next/head";
import { useState, useEffect } from "react";
import { listBlogsWithCategoriesAndTags } from "../actions/blog";
import { format, utcToZonedTime } from 'date-fns-tz';
import { APP_NAME, APP_DESCRIPTION, DOMAIN, APP_TITLE } from "@/config";
import { useRouter } from 'next/router';
export const runtime = "experimental-edge";

function convertToReadable(timestamp) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = date.toLocaleDateString('en-GB', options);  // 'en-GB' for "day month year" format
  return readableDate;
}


function BlogCard({ post }) {



  const authorImages = {
    "Divyanshu Rawat": "/divyanshu-rawat.webp",
    "Ravi Pundir": "/ravi-pundir.webp",
  };

  const authorprofiles = {
    "Divyanshu Rawat": "divyanshu-rawat",
    "Ravi Pundir": "ravi-pundir",
  };

  const authorprofile = authorprofiles[post?.author]
  const imageSrc = authorImages[post?.author] || "/default-avatar.webp";


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">

      <div className="relative h-40 bg-gray-200">
        <img src={post?.photo} alt={post?.title} className="w-full h-full object-cover" />

        <div className="absolute top-3 left-3">
          <span className=" flex text-white text-xs font-medium rounded-full">
            {post?.categories.map((cat, i) => {
              return <div className="mr-1 p-1 bg-[#0f5c7d] rounded-md" key={i}><a href={`${DOMAIN}/categories/${cat?.slug}`}>{cat?.name}</a></div>
            })}
          </span>
        </div>
      </div>


      <div className="p-4 flex-1 flex flex-col">

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{convertToReadable(post.date)}</span>
        </div>


        <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          <a href={`${DOMAIN}/${post?.slug}`} className="hover:text-[#0A4158]">{post?.title}</a>
        </h2>


        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {post?.excerpt}
        </p>


        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-medium text-gray-600">
                <img src={imageSrc} alt={post?.author} className="rounded-full" />
              </span>

            </div>
            <span className="text-xs font-medium text-gray-700">
              <a href={`${DOMAIN}/profile/${authorprofile}`}>{post?.author}</a>
            </span>
          </div>

          <button className="text-[#0f5c7d] hover:text-[#0A4158] text-xs font-medium">
            <a href={`${DOMAIN}/${post?.slug}`}> Read More →</a>
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
                <div className=" rounded-lg flex items-center justify-center">
                  {/* <img src={`${post?.photo}`} className="object-cover w-[100px] h-[80px]" /> */}
                  <img src={`${post?.photo}`} alt={post?.title} className="object-contain w-[100px] h-[80px] bg-gray-100" />

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



export default function Home({ initialBlogs, initialPagination, recentPosts }) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const currentPage = parseInt(router.query.pagenumber) || 1;


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
      },
      {
        "@type": "WebPage",
        "name": APP_NAME,
        "description": APP_DESCRIPTION,
        "url": DOMAIN
      },
      {
        "@type": "LocalBusiness",
        "name": APP_NAME,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "postalCode": "140301",
          "addressCountry": "India"
        },
        "telephone": "9988177179",
        "openingHours": ["Mo-Su 00:00-23:59"],
        "description": APP_DESCRIPTION,
        "image": `${DOMAIN}/logo.jpg`,
        "url": DOMAIN
      }
    ]
  };



  const head = () => (
    <Head>
      <title>{`${APP_TITLE} `}</title>
      <meta name="description" content={APP_DESCRIPTION} />
      <link rel="canonical" href={`${DOMAIN}`} />
      <meta property="og:title" content={`${APP_NAME}`} />
      <meta property="og:description" content={APP_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <meta property="og:url" content={`${DOMAIN}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/logo.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/logo.jpg`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:locale" content="hi_IN" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
              {currentPage > 1 && (
                <div className="mb-4 text-gray-600">
                  Page {currentPage} of {pagination?.totalPages}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogs.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={pagination.totalPages} />
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
}

export async function getServerSideProps(context) {
  try {
    const page = Number(context.query.pagenumber) || 1;
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
        initialPagination: data?.pagination || null,
        recentPosts: data?.recentPosts
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