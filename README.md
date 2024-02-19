# DevLead.lv

A modern and performant [DevLead.lv](https://devlead.lv) website built with [Astro](https://astro.build/).

![DevLead Logo](./src/assets/logo.png)

## Table of contents

- [DevLead.lv](#devleadlv)
  - [Table of contents](#table-of-contents)
  - [Development](#development)
    - [Requirements](#requirements)
      - [Node.js](#nodejs)
      - [pnpm](#pnpm)
    - [Project setup](#project-setup)
    - [Production](#production)
  - [Project guidelines](#project-guidelines)
    - [Astro and Tailwind](#astro-and-tailwind)
    - [Folder structure](#folder-structure)
    - [Managing translations](#managing-translations)
    - [Routing](#routing)
    - [Using images](#using-images)
    - [Code formatting](#code-formatting)
    - [Lighthouse](#lighthouse)
  - [Contributing](#contributing)

## Development

### Requirements

Requires [Node.js](https://nodejs.org/en/download) 20+ and the
[pnpm](https://pnpm.io/installation) package manager to run.

#### Node.js

Download a pre-built Node.js binary from the
[Node.js](https://nodejs.org/en/download) website for your operating system. 

#### pnpm

The pnpm package manager was chosen because it saves more diskspace and network
usage as compared to npm. It's also way faster 🚀

```bash
npm install -g pnpm
```

### Project setup

First of all clone this repository locally:

```bash
git clone [project]
```

Within the cloned repository install the required dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

The development server should be available at http://localhost:4321/

### Production

To get a production-ready build of the project just run the build command:

```bash
pnpm build
```

This command generates static HTML within the `dist` directory, which also
contains the rest of the necessary files.

If you get any errors that you might not see when running a development build -
please fix them.

> Note: There might be a need to change some `astro.config.mjs` configuration options
for a successful deployment (like `astro.base` and `astro.site`), but these will
be documented later when such a time draws closer.

## Project guidelines

### Astro and Tailwind

This project is primarily built on top of [Astro](https://astro.build/) and [Tailwind](https://tailwindcss.com/), please
make sure to read up on the documentation.

### Folder structure

The basic folder structure is documented here:

```
.
├── src
│   ├── assets (static assets like images)
│   ├── components (individual components)
│   ├── i18n (translation utilities)
│   │   ├── locales/[locale]/common.json (translation file)
│   │   └── ...
│   ├── layouts (various layouts)
│   ├── pages (generated page entrypoints)
│   │   ├── [locale] (automatically generates translation pages)
│   │   ├── ...
│   │   └── index.astro
│   └── ...
└── README.md
```

### Managing translations

Translations can be added by modifying the corresponding locale translation file
which can be found at `src/i18n/locales/[locale]/common.json`. The translation
file's structure is flexible - new items can be added without much worry.

You should first modify the `defaultLocale` (`en`), because it acts as a default
value for all the other `locales` present in the project.

An example of a translation file would be:

```json
{
  "nav": {
    "solutions": "Solutions",
  }
}
```

> Note: `src/i18n/locales/en/common.json`

In this file there is only one translation with the key of `nav.solutions`, to
add more just create new json items in the file.

To use translations you can use the provided utilities found in `src/i18n/utils`
file.

Example of using translated text:

```astro
import { getLocaleFromUrl, useTranslations } from '../i18n/utils';

// This gets the current locale from our current page url (this runs at build time)
const currentLocale = getLocaleFromUrl(Astro.url);

// Get the translation utility function from the current locale
const t = useTranslations(currentLocale);
---
<h1>{t.nav.solutions}</h1>
```
> Note: Use inside any `.astro` file

Translation keys within the utlity `useTranslations` function should be
type-safe and get TypeScript type predictions.

### Routing

If you ever need to use local routing within the page you need to use a
locale-safe link. To do that use the `useTranslatedPath` utility function. An
example:

```astro
...
const currentLocale = getLocaleFromUrl(Astro.url);
const l = useTranslatedPath(currentLocale);
---
<a href={l('products')}>Go to products page</a>
```

The above seen link will be translated to `/products` if the current locale is
the default one and to `/[locale]/products` if your current locale is any
different.

### Using images

Keep all images within the `src/assets` directory and import them directly.
Using this practice allows the Astro build tool to optimize these images for
production later on.

Example of importing and using images:

```astro
import productImage from '../../assets/product.png';
import { Image } from 'astro:assets';
---
<Image src={thumbnail} alt='alt attribute' />
```
> Note: Make sure to always provide an `alt` attribute for accessibility purposes

Static assets can also be used within the `public` directory, documentation
about that can be found in the [Astro
documentation](https://docs.astro.build/en/basics/project-structure/#public).

### Code formatting

All code should be formatted using [Prettier](https://prettier.io/), preferably
with a [Prettier
VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
extension.

### Lighthouse 

Preferrably check
[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) reports and
fix any warnings or suggestions it may throw at you. This will make sure
everything is the best it can be.

> Note: During development builds Lighthouse will never be 100% satisfied, beause of injected
> devtools and an unoptimized build.

## Contributing

To keep the code nice and clean please create a pull request whenever making
changes and have someone look at the changes before merging into the `main`
branch.

> Note: There is a husky pre-commit hook that lints the code and checks for
> Astro warnings before allowing a commit to be pushed.