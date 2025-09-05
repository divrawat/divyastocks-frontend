/*
import Link from "next/link";
import { NavbarName } from "@/config";
import { FooterLinks } from "@/config";

export default function Footer() {


    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    return (

        <footer className=" dark:bg-[black] bg-[#0f5c7d] dark:text-[whitesmoke] text-[whitesmoke]">
            <div className="py-2 max-w-[1100px] mx-auto">
                <div className="container mx-auto md:flex flex-wrap justify-between items-center">
                    <div className="md:flex items-center text-center">
                        <p className="font-bold p-3">{`${currentYear} @ ${NavbarName}`}</p>
                    </div>
                    <ul className="md:flex md:space-x-7 text-center leading-[2.5] p-3 font-bold">
                        {FooterLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="hover:text-[#a5a5f3] hover:underline">
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </footer>


    );
}
*/





import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { APP_DESCRIPTION, APP_NAME, DOMAIN } from '@/config';


export default function CenteredFooter() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-black text-white pt-16 pb-8 px-4">
            <div className="max-w-6xl mx-auto">

                <div className="md:flex items-center justify-center gap-28">


                    <div className='pb-10'>
                        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            {APP_NAME}
                        </h2>
                        <p className="text-gray-400 mb-6">
                            {APP_DESCRIPTION}
                        </p>
                        <div className="flex space-x-5">
                            <a href="https://www.facebook.com/profile.php?id=100090056526872" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
                                <FaFacebook size={22} />
                            </a>
                            <a href="https://www.instagram.com/divya_stock_academy/" className="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110">
                                <FaInstagram size={22} />
                            </a>
                            <a href="https://www.youtube.com/@divyastockmarket174" className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110">
                                <FaYoutube size={22} />
                            </a>
                        </div>
                    </div>

                    <div className='md:flex gap-24'>
                        <div className='pb-10'>
                            <h3 className="text-lg font-semibold mb-5 uppercase tracking-wider text-gray-300">Categories</h3>
                            <ul className="space-y-3">
                                <li><a href={`${DOMAIN}/categories/stocks`} className="text-gray-400 hover:text-white transition-colors duration-300">Stocks</a></li>
                                <li><a href={`${DOMAIN}/categories/markets`} className="text-gray-400 hover:text-white transition-colors duration-300">Markets</a></li>
                                <li><a href={`${DOMAIN}/categories/ipo`} className="text-gray-400 hover:text-white transition-colors duration-300">IPO</a></li>
                                <li><a href={`${DOMAIN}/categories/crypto`} className="text-gray-400 hover:text-white transition-colors duration-300">Crypto</a></li>
                            </ul>
                        </div>


                        <div className='pb-10'>
                            <h3 className="text-lg font-semibold mb-5 uppercase tracking-wider text-gray-300">Company</h3>
                            <ul className="space-y-3">
                                <li><a href={`${DOMAIN}/about`} className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                                <li><a href={`${DOMAIN}/contact`} className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
                                <li><a href={`${DOMAIN}/privacy-policy`} className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                                <li><a href={`${DOMAIN}/disclaimer`} className="text-gray-400 hover:text-white transition-colors duration-300">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>





                </div>

                {/* Copyright */}
                <div className="mt-14 pt-8 border-t border-gray-800">
                    <p className="text-gray-500 text-sm text-center">
                        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}