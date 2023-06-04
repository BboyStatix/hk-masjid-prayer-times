![HK Masjid Prayer Times Demo video](hk-masjid-prayer-times.gif)

[Web app](https://hk-masjid-prayer-times.vercel.app/) that displays jamaat times across mosques/madrassas across Hong Kong making use of [MasjidAl](https://mymasjidal.com/)'s API.

In WhatsApp groups it's very common for people to enquire about the jamaat/iqamah times of a specific mosque. Instead of having to answer the same question again and again it should be possible for people to find out this information themselves. Although there're already apps for that, it introduces a lot of friction to something that should be as simple as a Google search.

Instead, all this information can be put on a website with good SEO that makes it simple to Google search for and link to.
Furthermore, by utilising [OpenGraph](https://ogp.me) meta tags, one can get a quick preview of the iqamah times by just pasting the link e.g. on WhatsApp, Facebook, Discord, etc.
For example, this is how a preview of a link posted on WhatsApp would look like
<img width="1057" alt="Screenshot 2023-06-04 at 3 31 57 PM" src="https://github.com/BboyStatix/hk-masjid-prayer-times/assets/19769879/8a1231e6-7f77-4466-a2f9-c30f8a87f1b1">


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies used

This project uses server-side rendering with NextJS for SEO purposes.

Other technologies include, Tailwind CSS and TypeScript.
