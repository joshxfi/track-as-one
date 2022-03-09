const description =
  'A platform that enables students to track homework, activities, etc. together with their friends or classmates. With this platform, you can create rooms, invite your friends, and track tasks collaboratively!';

const imgUrl =
  'https://firebasestorage.googleapis.com/v0/b/trackas1.appspot.com/o/seo%2FtrackAsOne_Logo.png?alt=media&token=cddef829-6dc2-4368-a2d8-57db7a974e16';

export default {
  title: 'trackAsOne | Task Tracker',
  description,
  openGraph: {
    type: 'website',
    url: 'https://trackasone.me',
    title: 'trackAsOne | Task Tracker',
    description,
    images: [
      {
        url: imgUrl,
        width: 800,
        height: 600,
        alt: 'trackAsOne',
        type: 'image/jpeg',
      },
      {
        url: imgUrl,
        width: 900,
        height: 800,
        alt: 'trackAsOne Alt',
        type: 'image/jpeg',
      },
      {
        url: imgUrl,
      },
    ],
    site_name: 'trackAsOne',
  },
  twitter: {
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icon-96x96.png',
      sizes: '96x96',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};
