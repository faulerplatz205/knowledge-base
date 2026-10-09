import React, { type ReactNode } from "react";
import Layout from "@theme-original/DocItem/Layout";
import type LayoutType from "@theme/DocItem/Layout";
import type { WrapperProps } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { DEFAULT_LOCALE } from "../../../utils/locale";
import MachineTranslatedBanner from "./MachineTranslatedBanner";
import NotTranslatedBanner from "./NotTranslatedBanner";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
    const currentLocale = useDocusaurusContext().i18n.currentLocale;
    const { metadata, frontMatter } = useDoc();

    const isUntranslated = currentLocale !== DEFAULT_LOCALE && !metadata.source.startsWith(`@site/i18n/${currentLocale}/`);
    const isMachineTranslated = !isUntranslated && (frontMatter as { machine_translated?: boolean }).machine_translated === true;
    const originalPath = metadata.permalink.replace(`/${currentLocale}/`, "/");

    return (
        <>
            {isUntranslated && <NotTranslatedBanner />}
            {isMachineTranslated && <MachineTranslatedBanner originalPath={originalPath} />}
            <Layout {...props} />
        </>
    );
}
