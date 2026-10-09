import React, { useEffect, type ReactNode } from "react";
import Layout from "@theme-original/DocItem/Layout";
import type LayoutType from "@theme/DocItem/Layout";
import type { WrapperProps } from "@docusaurus/types";
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useDoc, useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import { useFeedbackSection } from "../../../utils/feedbackSection";
import NotTranslatedBanner from "./NotTranslatedBanner";

type Props = WrapperProps<typeof LayoutType>;

function findLabel(items: PropSidebarItem[], href: string): string | null {
    for (const item of items) {
        if (item.type === "html") continue;
        if (item.href === href) return item.label;
        if (item.type === "category") {
            const label = findLabel(item.items, href);
            if (label) return label;
        }
    }
    return null;
}

export default function LayoutWrapper(props: Props): ReactNode {
    const currentLocale = useDocusaurusContext().i18n.currentLocale;
    const metadata = useDoc().metadata;
    const sidebar = useDocsSidebar();
    const { setSection } = useFeedbackSection();

    const isUntranslated = currentLocale === "de" && !metadata.source.startsWith("@site/i18n/de");

    const section = (sidebar && findLabel(sidebar.items, metadata.permalink)) ?? metadata.title;
    useEffect(() => {
        setSection(section);
        return () => setSection(null);
    }, [ section, setSection ]);

    return (
        <>
            {isUntranslated && <NotTranslatedBanner />}
            <Layout {...props} />
        </>
    );
}
