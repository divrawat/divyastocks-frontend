import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { DOMAIN, APP_NAME, APP_DESCRIPTION } from "@/config";
import Link from "next/link";

const About = () => {


    const head = () => (
        <Head>
            <title>Author Ravi Pundir</title>
            <meta name="description" content={APP_DESCRIPTION} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/profile/ravi-pundir`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`${APP_NAME} - About`} />
            <meta property="og:description" content={APP_DESCRIPTION} />
            <meta property="og:url" href={`${DOMAIN}/profile/ravi-pundir`} />
            <meta property="og:site_name" content={APP_NAME} />
        </Head>
    );


    return (
        <>
            <Navbar />
            {head()}

            <div className="max-w-[1100px] mx-auto pt-6 pb-12 px-4">
                <h1 className="text-center font-bold text-4xl mb-6">Ravi Pundir</h1>
                {/* Intro Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-2">About Me</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        नमस्ते! मैं हाल ही में कंप्यूटर साइंस में स्नातक हूँ और मुझे तकनीक, सॉफ्टवेयर विकास
                        और शेयर बाजार में गहरी रुचि है। मुझे कोड के माध्यम से व्यावहारिक समाधान बनाने और वित्तीय बाजारों में लगातार खोजबीन करने में आनंद आता है।
                        मैं वर्तमान में सॉफ्टवेयर इंजीनियरिंग और फिनटेक में आगे बढ़ने के अवसरों की तलाश में हूँ।
                    </p>
                </section>

                {/* Skills Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Skills & Interests</h2>
                    <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                        <li>प्रोग्रामिंग: जावास्क्रिप्ट, पायथन, C++</li>
                        <li>वेब डेवलपमेंट: रिएक्ट, नोड.js, टेलविंड CSS</li>
                        <li>डेटाबेस: MySQL, MongoDB</li>
                        <li>अन्य रुचियाँ: शेयर बाज़ार विश्लेषण, एल्गो ट्रेडिंग, मशीन लर्निंग</li>
                    </ul>
                </section>

            </div>

            <Footer />
        </>
    )
}


export default About