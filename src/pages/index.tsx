import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import type { ReactElement, ReactNode } from "react";
import styles from "./index.module.css";

function HomepageHeader(): ReactElement {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Knowledge Base</h1>

            <div className={styles.intro}>
                <p><Translate id="landingpage.tagline" description="Tagline below the title on the landingpage">A collection of my notes, code snippets, and insights from my career as a developer.</Translate></p>
            </div>

            <div className={styles.about}>
                <h2><Translate id="landingpage.about.title" description="Title of the 'About this page' section">About this page</Translate></h2>
                <p><Translate id="landingpage.about.description1" description="First paragraph describing the knowledge base">Here I document my learning progress, experiments, and solutions to various development topics. The focus is on JavaScript/TypeScript, web technologies, and everything I encounter on my way to becoming a better developer everyday.</Translate></p>
                <p><Translate id="landingpage.about.description2" description="Second paragraph describing the knowledge base">This knowledge base is less of a perfect tutorial and more of a living working document, including mistakes that I learn from.</Translate></p>
            </div>

            <div className={styles.about}>
                <h2><Translate id="landingpage.aboutme.title" description="Title of the 'About me' section">About me</Translate></h2>
                <p><Translate id="landingpage.aboutme.description1" description="First paragraph about the about me section">I am an apprentice software developer in my final year. At work, I build business logic, interfaces and REST integrations for an xRM platform. In my spare time, I develop web frontends, backends, APIs and developer tools with TypeScript, some of which I publish as open-source packages on npm.</Translate></p>
                <p><Translate id="landingpage.aboutme.description2" description="Second paragraph about the about me section">Besides development, I run my own infrastructure with Docker and Linux. Three servers in Nuremberg, New York and Singapore host more than 20 self-hosted services, including this knowledge base with its Typesense search, my personal API, Umami analytics, ntfy push notifications and a monitoring stack built on Grafana, Prometheus and Loki.</Translate></p>
                <p><Translate id="landingpage.aboutme.description3" description="Third paragraph about the about me section">I develop software not only for school or work, but because I enjoy building new things, solving problems independently and learning constantly.</Translate></p>
            </div>

            <Link to="/docs/" className={styles.cta}>
                <Translate id="landingpage.cta" description="Call-to-action button text linking to the documentation">To the Docs →</Translate>
            </Link>
        </div>
    );
}

export default function Home(): ReactNode {
    return (
        <Layout
            title="Knowledge Base"
            description="My developer knowledge base documenting my learning process and solutions in JavaScript, TypeScript, web technologies, and everything I encounter on my journey">
            <HomepageHeader />
        </Layout>
    );
}
