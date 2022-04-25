// Sanity Client

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//Connects to sanity client
export const client = sanityClient({
    projectId: 'mir5ar5a',
    dataset: 'production',
    apiVersion: '2023-04-23',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

//Give access to sanity Urls where images are stored
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

