import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DOMAIN, APP_NAME } from "@/config";
import Head from "next/head";

const Contact = () => {


    const description = "Thank you for reaching out to Dirmatech. We value your feedback and inquiries. Please use the following information to get in touch with us."

    const head = () => (
        <Head>
            <title>{`Contact - ${APP_NAME}`}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/contact`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={APP_NAME} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={DOMAIN} />
            <meta property="og:site_name" content={APP_NAME} />
        </Head>
    );





    return (
        <>

            <Navbar />
            {head()}


            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue ? Want to send feedback ? Send us an Email at divrawat2001@gmail.com</p>
                    <form action="#" class="space-y-8">
                        <div>
                            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <label htmlFor="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                        </div>

                        <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#318b8f] hover:bg-[#1b4446] hover:scale-105 transition-transform">Send message</button>
                    </form>
                </div>
            </section>


            <Footer />


        </>
    )
}


export default Contact