import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
    'X-RapidAPI-Key': 'f3e96b9ad9msh38268a3395974c3p162f1ejsnaf2109d7bc6b',
    'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
}

const baseUrl = 'https://real-time-news-data.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory }) =>
                createRequest(`/search?query=${newsCategory}`),
            // Setze die CORS-Richtlinie in der Anfrage
            providesTags: ['CryptoNews'],
            headers: {
                'Cross-Origin-Resource-Policy': 'cross-origin'
            },
        })

    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
