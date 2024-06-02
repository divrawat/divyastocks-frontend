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
        "Welcome to DirmaTech, where coding meets creativity! Founded with a passion for programming and a commitment to empowering learners of all levels, we strive to be your go-to destination for all things related to software development and technology.",
        "At DirmaTech, we believe that coding is not just a skill but an art form. Whether you're a beginner taking your first steps into the world of programming or an experienced developer looking to sharpen your skills, we provide the resources, tools, and community support you need to succeed.",
        "Our mission is to make learning to code accessible, engaging, and fun for everyone. We offer a diverse range of tutorials, articles, and projects covering various programming languages, frameworks, and technologies. From web development and mobile app creation to data science and machine learning, we've got you covered.",
        "What sets us apart is our commitment to creativity. We believe that coding is not just about writing lines of code but also about solving problems, expressing ideas, and building innovative solutions. That's why we emphasize not only the technical aspects of programming but also the creative and problem-solving aspects.",
        "At DirmaTech, we understand that learning to code can sometimes feel daunting. That's why we've created a supportive community where learners can connect, share knowledge, and inspire each other. Whether you're seeking guidance on a tricky concept or looking for feedback on your latest project, you'll find a welcoming community ready to help.",
        "Join us on our journey to unlock the power of code and unleash your creativity. Whether you're here to learn, to teach, or simply to explore, we're excited to have you as part of our community.",
        "Divyanshu Rawat",
        "Founder, dirmatech.com"
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