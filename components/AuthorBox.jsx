
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { DOMAIN } from '@/config';

const AuthorBox = ({ selectedAuthorName }) => {


    const authors = [
        {
            name: 'Divyanshu Rawat',
            image: '/divyanshu.webp',
            bio: `मैं एक पोस्ट ग्रेजुएट छात्र निवेशक और शेयर बाजार का गहरा उत्साही हूँ जो '${DOMAIN}' में कंटेंट राइटर के रूप में कार्यरत रहते हुए फाइनेंस और स्टॉक्स पर शोधपूर्ण लेखन करता हूँ तथा जिसका उद्देश्य वित्तीय साक्षरता को बढ़ावा देना और लोगों को समझदारी से निवेश करने की प्रेरणा देना है`,
            socialMedia: [
                {
                    name: 'Facebook',
                    url: 'https://www.facebook.com/divyanshu.rawat.5055',
                    icon: <FaFacebook className="h-6 w-6 text-blue-600" />,
                },
                {
                    name: 'Twitter',
                    url: 'https://x.com/divrawat2001',
                    icon: <FaTwitter className="h-6 w-6 text-blue-400" />,
                },
                {
                    name: 'Instagram',
                    url: 'https://www.instagram.com/divrawat2001/',
                    icon: <FaInstagram className="h-6 w-6 text-pink-600" />,
                },
                {
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/divrawat2001/',
                    icon: <FaLinkedin className="h-6 w-6 text-blue-700" />,
                },
            ],
        },
        {
            name: 'Ravi Pundir',
            image: '/ravi-pundir.webp',
            bio: `मैं एक समर्पित पोस्ट ग्रेजुएट छात्र हूँ जिसे निवेश और शेयर बाजार के प्रति गहरी रुचि है जो शेयर बाज़ार की पेचीदगियों को समझने और उनके पीछे की रणनीतियों पर काम करने में लगातार प्रयासरत है और जो '${DOMAIN}' में एक कंटेंट राइटर के रूप में कार्य करते हुए फाइनेंस से जुड़े विषयों पर शोध और विश्लेषण आधारित लेखन करता है तथा जिसका मुख्य उद्देश्य वित्तीय जागरूकता को बढ़ावा देना और निवेश की सही समझ लोगों तक पहुँचाना है`,
            socialMedia: [
                {
                    name: 'Facebook',
                    url: 'https://www.facebook.com/ravi.pundir.12177',
                    icon: <FaFacebook className="h-6 w-6 text-blue-600" />,
                },
                {
                    name: 'Twitter',
                    url: 'https://x.com/ravi20015',
                    icon: <FaTwitter className="h-6 w-6 text-blue-400" />,
                },
                {
                    name: 'Instagram',
                    url: 'https://www.instagram.com/its_ravi_pundir/',
                    icon: <FaInstagram className="h-6 w-6 text-pink-600" />,
                },
                {
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/ravi-pundir-51b819163/',
                    icon: <FaLinkedin className="h-6 w-6 text-blue-700" />,
                },
            ],
        },
    ];


    const selectedAuthor = authors.find(author => author.name === selectedAuthorName);
    if (!selectedAuthor) { return <div className="text-red-500 p-4">Author not found.</div> }

    return (
        <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
            <div className="md:flex">
                <div className="md:shrink-0 p-6 self-center">
                    <div className="h-32 w-32 rounded-full overflow-hidden relative mx-auto md:mx-0">
                        <img src={selectedAuthor.image} alt="Author profile picture" className="object-cover h-full w-full" />
                    </div>
                </div>

                <div className="p-8">
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black text-[23px]">
                        {selectedAuthor.name}
                    </h2>
                    <div className="mt-4 flex space-x-4">
                        {selectedAuthor.socialMedia.map((platform, index) => (
                            <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={platform.name}
                                className="text-slate-500 transition-colors duration-300" >
                                {platform.icon}
                            </a>
                        ))}
                    </div>
                    <p className="mt-4">{selectedAuthor.bio}</p>
                </div>

            </div>
        </div>
    );
};
export default AuthorBox;