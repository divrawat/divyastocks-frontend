import fetch from 'isomorphic-fetch';
import { DOMAIN, BACKEND } from '@/config';

export const create = async (category, token) => {
    try {
        const response = await fetch(`${BACKEND}/api/category/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const getCategories = async (page = 1, perPage = 12) => {
    try {
        const response = await fetch(`${BACKEND}/api/categories?page=${page}&perPage=${perPage}`, {
            method: 'GET'
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { categories: [], pagination: null };
    }
};

export const singleCategory = async (slug, page = 1, perPage = 6) => {
    try {
        const response = await fetch(`${BACKEND}/api/category/${slug}?page=${page}&perPage=${perPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { category: null, blogs: [], pagination: null };
    }
};


export const removeCategory = async (slug, token) => {
    try {
        const response = await fetch(`${BACKEND}/api/category/${slug}`, {
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