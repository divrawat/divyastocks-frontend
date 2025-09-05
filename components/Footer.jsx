
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { APP_DESCRIPTION, APP_NAME, DOMAIN } from '@/config';


export default function CenteredFooter() {
    return (
        <footer className="bg-[#093345] text-white pt-16 pb-8 px-4">
            <div className="max-w-6xl mx-auto">

                <div className="md:flex items-center justify-center gap-28">


                    <div className='pb-10'>
                        <h2 className="text-2xl font-bold mb-4">
                            {APP_NAME}
                        </h2>
                        <p className=" mb-6">
                            {APP_DESCRIPTION}
                        </p>
                        <div className="flex space-x-5">
                            <a href="https://www.facebook.com/profile.php?id=100090056526872" className=" hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
                                <FaFacebook size={22} />
                            </a>
                            <a href="https://www.instagram.com/divya_stock_academy/" className=" hover:text-pink-500 transition-colors duration-300 transform hover:scale-110">
                                <FaInstagram size={22} />
                            </a>
                            <a href="https://www.youtube.com/@divyastockmarket174" className=" hover:text-red-500 transition-colors duration-300 transform hover:scale-110">
                                <FaYoutube size={22} />
                            </a>
                        </div>
                    </div>

                    <div className='md:flex gap-24'>
                        <div className='pb-10'>
                            <h3 className="text-lg font-semibold mb-5 uppercase tracking-wider text-gray-300">Categories</h3>
                            <ul className="space-y-3">
                                <li><a href={`${DOMAIN}/categories/stocks`} className=" transition-colors duration-300">Stocks</a></li>
                                <li><a href={`${DOMAIN}/categories/markets`} className=" transition-colors duration-300">Markets</a></li>
                                <li><a href={`${DOMAIN}/categories/ipo`} className=" transition-colors duration-300">IPO</a></li>
                                <li><a href={`${DOMAIN}/categories/crypto`} className=" transition-colors duration-300">Crypto</a></li>
                            </ul>
                        </div>


                        <div className='pb-10'>
                            <h3 className="text-lg font-semibold mb-5 uppercase tracking-wider">Company</h3>
                            <ul className="space-y-3">
                                <li><a href={`${DOMAIN}/about`} className=" transition-colors duration-300">About Us</a></li>
                                <li><a href={`${DOMAIN}/contact`} className=" transition-colors duration-300">Contact</a></li>
                                <li><a href={`${DOMAIN}/privacy-policy`} className=" transition-colors duration-300">Privacy Policy</a></li>
                                <li><a href={`${DOMAIN}/disclaimer`} className=" transition-colors duration-300">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>





                </div>

                {/* Copyright */}
                <div className="mt-14 pt-8 border-t border-gray-800">
                    <p className=" text-sm text-center">
                        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}