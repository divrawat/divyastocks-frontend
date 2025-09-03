import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { APP_NAME, DOMAIN } from "@/config";

const About = () => {


    const description = "Welcome to DirmaTech, where coding meets creativity! Founded with a passion for programming and a commitment to empowering learners of all levels, we strive to be your go-to destination for all things related to software development and technology."

    const head = () => (
        <Head>
            <title>{`About - ${APP_NAME}`}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="follow, index, noarchive, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
            <link rel="canonical" href={`${DOMAIN}/about`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={APP_NAME} />
            <meta property="og:title" content={`About - ${APP_NAME}`} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={APP_NAME} />
            <meta property="og:site_name" content={APP_NAME} />
        </Head>
    );

    const paragraphs = [
        "दिव्यास्टॉक्स में आपका स्वागत है - वित्त और शेयर बाज़ारों की तेज़ी से बदलती दुनिया में आपका विश्वसनीय मार्गदर्शक। निवेशकों, व्यापारियों और वित्तीय उत्साही लोगों के लिए बनाया गया, दिव्यस्टॉक्स सटीक, व्यावहारिक और व्यावहारिक बाज़ार समाचार और विश्लेषण प्रदान करने के लिए प्रतिबद्ध है।",

        "दिव्यास्टॉक्स में, हमारा मानना ​​है कि वित्तीय साक्षरता स्मार्ट निवेश का आधार है। चाहे आप शेयर बाज़ार की मूल बातें समझने वाले शुरुआती हों या नवीनतम रुझानों पर नज़र रखने वाले अनुभवी व्यापारी, हमारा प्लेटफ़ॉर्म आपकी यात्रा में सहायता के लिए मूल्यवान उपकरण, अंतर्दृष्टि और शिक्षा प्रदान करता है।",

        "हम बाज़ार समाचार, कंपनी की आय, आर्थिक संकेतक, निवेश रणनीतियाँ और पोर्टफोलियो प्रबंधन सहित वित्तीय विषयों की एक विस्तृत श्रृंखला को कवर करते हैं। रीयल-टाइम अपडेट और गहन विश्लेषण के साथ, दिव्यस्टॉक्स आपको बाज़ारों की गति और आपके पैसे के लिए इसके महत्व के बारे में सूचित रखता है।",

        "हमारा मिशन वित्तीय जानकारी को सुलभ और समझने योग्य बनाना है। हम जटिल विषयों को स्पष्ट और संक्षिप्त सामग्री में विभाजित करते हैं जो आपको आत्मविश्वास के साथ सूचित निर्णय लेने में सक्षम बनाती है - चाहे आप दैनिक ट्रेडिंग या दीर्घकालिक विकास की योजना बनाना।",

        "दिव्यास्टॉक्स को हमारी स्पष्टता, सत्यनिष्ठा और प्रासंगिकता पर केंद्रित होना ही हमारी विशिष्टता है। हम केवल समाचार ही नहीं देते - हम आँकड़ों के पीछे के 'कारण' की व्याख्या करते हैं, संभावित प्रभावों पर प्रकाश डालते हैं, और ऐसे दृष्टिकोण प्रस्तुत करते हैं जो आपको व्यापक तस्वीर देखने में मदद करते हैं।",

        "दिव्यास्टॉक्स समुदाय में शामिल हों और अपने वित्तीय भविष्य पर नियंत्रण रखें। चाहे आप शेयर बाजार के नवीनतम घटनाक्रमों से अवगत रहने, नई निवेश रणनीतियों को सीखने, या समान विचारधारा वाले निवेशकों के बढ़ते नेटवर्क से जुड़ने के लिए यहाँ आए हों - आप सही जगह पर आए हैं।",
    ];


    return (
        <>
            <Navbar />
            {head()}
            <div className="bg-[#f7f8f9] dark: pt-5 pb-5 dark:bg-[#10141c] dark:text-[#cecdcd]" >
                <div className="max-w-[1200px] mx-auto p-3 bg-[white] dark:bg-[#10141c] border border-solid border-[#d7d7d7] rounded-lg">

                    <div className=" max-w-[1100px] pt-3 pb-10 pr-3 pl-3 mx-auto">
                        <h1 className="text-center p-3 font-bold text-3xl mb-5">About</h1>

                        {paragraphs.map((paragraph, index) => (
                            <p key={index} className="mb-10">{paragraph}</p>
                        ))}


                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}


export default About