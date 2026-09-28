import "dotenv/config";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "MORITZ // KNOWLEDGE BASE",
    favicon: "img/favicon.svg",

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: "https://knowledge.moritz-grimm.dev",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "moritz-grimm", // Usually your GitHub org/user name.
    projectName: "knowledge-base", // Usually your repo name.

    onBrokenLinks: "warn",

    i18n: {
        defaultLocale: "en",
        locales: [ "en", "de" ],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
                sitemap: {
                    changefreq: "weekly",
                },
            } satisfies Preset.Options,
        ],
    ],

    themes: [ "docusaurus-theme-search-typesense" ],

    scripts: [
        {
            src: "https://analytics.moritz-grimm.dev/script.js",
            defer: true,
            "data-website-id": "a58b3d8f-fb79-4773-915d-cf0ef393c7fe",
            "data-performance": "true",
        },
    ],

    headTags: [
        {
            tagName: "script",
            attributes: {
                type: "application/ld+json",
            },
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Knowledge Base",
                "url": "https://knowledge.moritz-grimm.dev",
                "inLanguage": [ "en", "de" ],
                "author": {
                    "@type": "Person",
                    "name": "Moritz Grimm",
                    "givenName": "Moritz",
                    "familyName": "Grimm",
                    "url": "https://www.moritz-grimm.dev",
                    "jobTitle": "Developer",
                    "knowsAbout": [ "JavaScript", "TypeScript", "Node.js", "HTML", "CSS" ],
                    "knowsLanguage": [ "de", "en" ],
                    "sameAs": [ "https://github.com/moritz-grimm", "https://www.moritz-grimm.dev", "https://api.moritz-grimm.dev" ],
                },
            }),
        },
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        metadata: [
            {
                name: "description",
                content: "My knowledge base as a developer apprentice: I document my learning process, experiments, and solutions in JavaScript/TypeScript, web technologies & everything else i encounter on my journey",
            },
            {
                name: "twitter:card",
                content: "summary",
            },
            {
                name: "twitter:title",
                content: "Knowledge Base | Moritz Grimm",
            },
            {
                name: "twitter:description",
                content: "My knowledge base as a developer apprentice: I document my learning process, experiments, and solutions in JavaScript/TypeScript, web technologies & everything else I encounter on my journey",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:url",
                content: "https://knowledge.moritz-grimm.dev",
            },
            {
                property: "og:title",
                content: "Knowledge Base | Moritz Grimm",
            },
            {
                property: "og:description",
                content: "My knowledge base as a developer apprentice: I document my learning process, experiments, and solutions in JavaScript/TypeScript, web technologies & everything else I encounter on my journey",
            },
        ],
        colorMode: {
            respectPrefersColorScheme: true,
        },
        docs: {
            sidebar: {
                hideable: true,
            },
        },
        navbar: {
            title: "Knowledge Base",
            logo: {
                alt: "My GitHub Profile Picture",
                src: "img/favicon.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "docs",
                    position: "left",
                    label: "Knowledge",
                },
                {
                    // TODO: remove after the AP2 exam (2026-11-25)
                    to: "/docs/tags/ap2",
                    position: "left",
                    label: "AP2",
                },
                {
                    type: "localeDropdown",
                    position: "right",
                },
                {
                    type: "search",
                    position: "right",
                },
                {
                    href: "https://github.com/moritz-grimm/knowledge-base",
                    position: "right",
                    className: "header-github-link",
                    "aria-label": "Link to the Github repository of this website",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Socials",
                    items: [
                        {
                            label: "GitHub",
                            href: "https://github.com/moritz-grimm",
                        },
                        {
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/in/moritz-grimm-dev",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Homepage",
                            href: "https://www.moritz-grimm.dev",
                        },
                        {
                            label: "Source Code",
                            href: "https://github.com/moritz-grimm/knowledge-base",
                        },
                        {
                            label: "Status",
                            href: "https://status.moritz-grimm.dev/status/default",
                        },
                    ],
                },
                {
                    title: "Legal",
                    items: [
                        {
                            label: "Impressum",
                            href: "https://www.moritz-grimm.dev/impressum.html",
                        },
                        {
                            label: "Privacy Policy",
                            href: "https://www.moritz-grimm.dev/privacy-policy.html",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Knowledge Base, Built with Docusaurus by Moritz.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
        typesense: {
            typesenseCollectionName: "knowledge_base",
            typesenseServerConfig: {
                nodes: [
                    {
                        host: "typesense.moritz-grimm.dev",
                        port: 443,
                        protocol: "https",
                    },
                ],
                apiKey: process.env.TYPESENSE_READONLY_API_KEY,
            },

            // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
            typesenseSearchParameters: {
                query_by: "hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,embedding",
                query_by_weights: "6,5,4,3,2,1,1,1,0",
                vector_query: "embedding:([], k: 5, distance_threshold: 1.0, alpha: 0.3)",
                group_by: "url_without_anchor",
                group_limit: 2,
                sort_by: "_text_match:desc,item_priority:desc",
            },

            contextualSearch: true,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
