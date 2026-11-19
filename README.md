# ZimExplore

Mobile-first Zimbabwe domestic travel discovery app built with Vite, React, TypeScript, Tailwind CSS, React Router and Lucide.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build`.

The destination catalogue, operator contacts, prices and city-to-destination routes are prototype data in `src/data/destinations.ts`. Route distances and times are planning estimates; the calculator applies fuel and ZINARA toll assumptions to those values. The ZiG display uses the configurable example rate in the same data module. Replace these values with verified operator and routing data before public launch.
