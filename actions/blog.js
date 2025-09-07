import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND } from '@/config';

export const createBlog = async (blog, token) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: blog
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

/*
export const listBlogsWithCategoriesAndTags = async () => {
    try {
        const response = await fetch(`${BACKEND}/api/blogs-categories-tags`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
*/


export const listBlogsWithCategoriesAndTags = async (page = 1, perPage = 9) => {
    try {
        const response = await fetch(`${BACKEND}/api/blogs-categories-tags?page=${page}&perPage=${perPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { blogs: [], pagination: null };
    }
};



export const allblogs = async () => {
    try {
        const response = await fetch(`${BACKEND}/api/allblogslugs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });


        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const singleBlog = async (slug) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/${slug}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const singleDraft = async (slug) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/draft/${slug}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const listRelated = async (slug) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/${slug}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const removeBlog = async (slug, token) => {

    try {
        const response = await fetch(`${BACKEND}/api/blog/${slug}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const removeDraftBlog = async (slug, token) => {

    try {
        const response = await fetch(`${BACKEND}/api/blog/draft/${slug}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};







export const updateBlog = async (blog, token, slug) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/${slug}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: blog
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const updateDraft = async (blog, token, slug) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/draft/${slug}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: blog
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};


export const list = async (page, search, token) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/allblogs?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const Feeds = async () => {
    try {
        const response = await fetch(`${BACKEND}/api/rss-feeds`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}


export const draftlist = async (page, search, token) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/draft-blogs?page=${page}&search=${search}`, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) { return console.log(err); }
}









export const feedsDOMAIN = async () => {
    try {
        const response = await fetch(`${BACKEND}/rss`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};



export const updateAllToDraft = async (token) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/bulk-update-articles-draft`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Failed to update all articles to "draft" status.' };
    }
};



export const updateAllToPublish = async (token) => {
    try {
        const response = await fetch(`${BACKEND}/api/blog/bulk-update-articles-publish`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Failed to update all articles to "draft" status.' };
    }
};

