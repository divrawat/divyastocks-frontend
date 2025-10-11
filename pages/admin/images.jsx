
/*
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import fetch from "isomorphic-fetch";
import { DOMAIN, BACKEND } from "@/config";
import { getCookie } from '../../actions/auth';
const token = getCookie('token');
import { useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import AdminDashboard from "@/components/AdminDashboard";


function ImageGallary() {

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_apiKey,
        authDomain: process.env.NEXT_PUBLIC_authDomain,
        projectId: process.env.NEXT_PUBLIC_projectId,
        storageBucket: process.env.NEXT_PUBLIC_storageBucket,
        messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
        appId: process.env.NEXT_PUBLIC_appId,
        measurementId: process.env.NEXT_PUBLIC_measurementId,
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);


    const [file, setFile] = useState("");
    const [images, setImages] = useState([]);
    const [imagescount, setImagescount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedStatus, setCopiedStatus] = useState({});

    const [ModalOpen, setModalOpen] = useState(false);
    const [currentBlogSlug, setCurrentBlogSlug] = useState("");



    useEffect(() => { if (file.length > 0) { handleUpload(); } }, [file]);
    useEffect(() => { fetchData(); }, [currentPage]);


    const showModal = (slug) => {
        setModalOpen(true);
        setCurrentBlogSlug(slug);
    };

    const hideModel = () => {
        setModalOpen(false);
        setCurrentBlogSlug("");
    };

    const handleConfirmDelete = () => {
        handledelete(currentBlogSlug);
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };



    const getImages = async (page) => {
        try {
            const response = await fetch(`${BACKEND}/api/allimages?page=${page}`, { method: 'GET' });
            return await response.json();
        } catch (err) { return console.log(err); }
    };

    const fetchData = async () => {
        try {
            const data = await getImages(currentPage); setImages(data.data || []); setImagescount(data.totalImages || "0")
        } catch (error) { console.error('Error fetching images:', error); }
    };

    function handleChange(event) { const selectedFiles = event.target.files; setFile(selectedFiles); }

    const handleUpload = () => {
        for (let i = 0; i < file.length; i++) {
            const storageRef = ref(storage, `/newblogs/${file[i].name}-${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, file[i]);

            uploadTask.on("state_changed", () => { },
                (err) => { console.log(err); },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        saveUrlToMongoDB(url, token);
                        setImages(prevImages => [{ url, _id: Date.now() }, ...prevImages]);
                        // fetchData();
                    });
                });
        }
    };


    const saveUrlToMongoDB = async (url, token) => {
        try {
            const response = await fetch(`${BACKEND}/api/uploadimages`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ url })
            });
            return await response.json();
        } catch (err) { return console.log(err); }
    };


    const removeImage = async (url, token) => {
        try {
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`${BACKEND}/api/images/${encodedUrl}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error); return { error: 'Failed to delete image' };
        }
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedStatus(prevStatus => ({ ...prevStatus, [url]: true, }));
            setTimeout(() => { setCopiedStatus(prevStatus => ({ ...prevStatus, [url]: false, })); }, 2000);
        } catch (err) { console.error('Error copying to clipboard:', err); }
    };

    const handledelete = async (url) => {
        try {
            removeImage(url, token);
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
            fetchData();
        } catch (error) { console.error('Error Deleting:', error); }
    }


    const handlePageChange = (newPage) => { setCurrentPage(newPage); };



    return (
        <AdminDashboard>

            <div className="text-center">
                {imagescount ? (<h3 className="font-bold">Total &nbsp; Images &nbsp; - &nbsp; <span> {imagescount} </span></h3>) : (<></>)}
                <br />

                <div>
                    <label className="cursor-pointer mr-5 px-3 py-2 bg-[#1c2434] text-sm font-semibold tracking-wide text-white rounded-[8px] hover:text-[yellow]">
                        Upload Images
                        <input type="file" className="hidden" onChange={handleChange} multiple accept="image/*" />
                    </label>
                </div>
            </div>

            <br />

            <div className="text-center">
                <button className={`rounded-[8px] tracking-wide text-white mr-5 px-2 py-1 text-[12px] font-semibold ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1c2434] hover:text-[yellow] cursor-pointer hover:scale-105 active:scale-95  transistion-transform'
                    }`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>

                <span>{currentPage}</span>

                <button className={`rounded-[8px] tracking-wide text-white ml-5 px-2 py-1 text-[12px] font-semibold ${currentPage >= Math.ceil(imagescount / 10) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1c2434] hover:text-[yellow] cursor-pointer hover:scale-105 active:scale-95  transistion-transform'
                    }`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(imagescount / 10)}>Next</button>
            </div>

            <div className="max-w-[1100px]" >
                <div className="flex mt-[18px] flex-row flex-wrap justify-center">
                    {images && images.map((image) => (
                        <div key={image._id} className="mb-8">
                            <img src={image.url} alt={image.description} loading="lazy" className="object-cover m-2.5 h-[160px] w-[170px]" />
                            <div className="text-center">
                                <button className="px-2 py-1 bg-[#1c2434] text-[12px] font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 hover:text-[yellow] transition-transform" onClick={() => handleCopy(image.url)}> {copiedStatus[image.url] ? 'URL Copied!' : 'Copy URL'}</button>

                                <div> <button className="px-2 py-1 mt-2 bg-[#1c2434] text-[12px] font-semibold tracking-wide text-white rounded-[8px] hover:scale-105 active:scale-95 hover:text-[yellow] transition-transform" onClick={() => showModal(image.url)} >Delete </button></div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>


            <div className={`fixed inset-0 flex items-center justify-center z-50 md:pl-[150px]  ${ModalOpen ? '' : 'hidden'}`}>
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
                <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                    <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this Image ?</h2>


                    <div className="flex justify-end mt-8">
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2" onClick={() => handleConfirmDelete()} >Delete</button>
                        <button className="bg-slate-800 text-sm hover:bg-slate-900 hover:scale-105 active:scale-95 transition-transform text-white font-semibold py-2 px-4 rounded mr-2"
                            onClick={hideModel}>Cancel</button>

                    </div>
                </div>
            </div>



        </AdminDashboard>
    );
}

export default ImageGallary
*/


import { DOMAIN, BACKEND, IMAGES_DOMAIN } from '@/config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from '@/components/AdminDashboard';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [copiedImageId, setCopiedImageId] = useState(null);

    const fetchImages = async (pageNum = 1) => {
        try {
            const res = await axios.get(`${BACKEND}/api/images?page=${pageNum}&limit=6`);
            setImages(res.data.images);
            setPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image || image.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        image.forEach(file => {
            formData.append('images', file);
        });

        try {
            await axios.post(`${BACKEND}/api/images/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            });

            setImage(null);
            fetchImages();
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handlePageChange = (newPage) => {
        fetchImages(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copyImageUrl = async (url, imageId) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedImageId(imageId);

            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setCopiedImageId(null);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <AdminDashboard>
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Image Gallery</h2>
                    <p className="text-gray-600 mb-6">Upload and manage your images</p>

                    <form onSubmit={handleUpload} className="mb-8">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="relative flex-grow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setImage(Array.from(e.target.files))}
                                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
                                    disabled={isUploading}
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {(!image || image.length === 0) && (
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Drag and drop or <span className="text-blue-600 font-medium">browse files</span>
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="sm:self-end">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!image || image.length === 0 || isUploading}
                                >
                                    {isUploading ? 'Uploading...' : `Upload ${image?.length || 0} Image${image?.length !== 1 ? 's' : ''}`}
                                </button>
                            </div>
                        </div>

                        {image && image.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">
                                    Selected files: {image.map(file => file.name).join(', ')}
                                </p>
                            </div>
                        )}

                        {isUploading && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                                    <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Uploaded Images</h3>
                        <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                    </div>

                    {images.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No images yet</h3>
                            <p className="mt-1 text-gray-500">Get started by uploading your first image.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {images.map((img) => (
                                    <div key={img._id} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <img
                                            // src={img.url}
                                            src={`${IMAGES_DOMAIN}/${img.url}`}
                                            alt="Uploaded"
                                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={() => copyImageUrl(`${IMAGES_DOMAIN}/${img.url}`, img._id)}
                                                className="bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-blue-50 transition-colors"
                                                title="Copy image URL"
                                            >
                                                {copiedImageId === img._id ? (
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {copiedImageId === img._id && (
                                            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                                                <div className="bg-green-100 text-green-800 text-xs font-medium py-1 px-2 rounded-md shadow-md animate-fadeIn">
                                                    Link copied to clipboard!
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <nav className="flex items-center space-x-1">
                                        <button
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                            className="px-3 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: totalPages }, (_, idx) => {
                                            // Show limited page numbers with ellipsis for many pages
                                            if (totalPages <= 7 ||
                                                idx === 0 ||
                                                idx === totalPages - 1 ||
                                                (idx >= page - 2 && idx <= page + 2)) {
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handlePageChange(idx + 1)}
                                                        className={`px-4 py-2 rounded-md ${page === idx + 1
                                                            ? 'bg-blue-600 text-white font-medium'
                                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                );
                                            } else if (
                                                (idx === 1 && page > 4) ||
                                                (idx === totalPages - 2 && page < totalPages - 3)
                                            ) {
                                                return <span key={idx} className="px-2 py-2 text-gray-500">...</span>;
                                            }
                                            return null;
                                        })}

                                        <button
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                            className="px-3 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Global Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </AdminDashboard>
    );
};

export default ImageUploader;