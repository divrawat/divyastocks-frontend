import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { DOMAIN, APP_NAME, APP_DESCRIPTION } from "@/config";
import Link from "next/link";

const About = () => {


    const head = () => (
        <Head>
            <title>Author Divyanshu Rawat</title>
            <meta name="description" content={APP_DESCRIPTION} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/profile/divyanshu-rawat`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - About`} />
            <meta property="og:description" content={APP_DESCRIPTION} />
            <meta property="og:url" href={`${DOMAIN}/profile/divyanshu-rawat`} />
            <meta property="og:site_name" content={APP_NAME} />
        </Head>
    );


    return (
        <>
            <Navbar />
            {head()}

            <div className="max-w-[1100px] mx-auto pt-6 pb-12 px-4">
                <h1 className="text-center font-bold text-4xl mb-6">Divyanshu Rawat</h1>
                {/* Intro Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-2">About Me</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        मैं शेयर बाज़ार का एक उत्साही और कंप्यूटर साइंस स्नातक हूँ, और वित्तीय बाज़ारों, एल्गोरिथम ट्रेडिंग और डेटा-संचालित निवेश में गहरी रुचि रखता हूँ।
                        मुझे बाज़ार के रुझानों का विश्लेषण करना, ट्रेडिंग रणनीतियों का बैक-टेस्टिंग करना और बेहतर निवेश निर्णय लेने के लिए तकनीक का उपयोग करना पसंद है।
                        वर्तमान में मैं फिनटेक और क्वांटिटेटिव फ़ाइनेंस क्षेत्र में अवसरों की तलाश कर रहा हूँ।
                    </p>
                </section>

                {/* Skills Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Skills & Interests</h2>
                    <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                        <li>तकनीकी और मौलिक विश्लेषण</li>
                        <li>पाइथन और एपीआई (ज़ीरोधा, अल्पाका) के साथ एल्गोरिदमिक ट्रेडिंग</li>
                        <li>पांडा और बैकट्रेडर का उपयोग करके बैकटेस्टिंग रणनीतियाँ</li>
                        <li>पोर्टफोलियो प्रबंधन और जोखिम विश्लेषण</li>
                        <li>क्रिप्टोकरेंसी और वैश्विक बाजार ट्रैकिंग</li>
                    </ul>
                </section>

            </div>

            <Footer />
        </>
    )
}


export default About