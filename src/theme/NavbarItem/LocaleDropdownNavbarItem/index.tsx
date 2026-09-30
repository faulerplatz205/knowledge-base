import type { WrapperProps } from "@docusaurus/types";
import LocaleDropdownNavbarItem from "@theme-original/NavbarItem/LocaleDropdownNavbarItem";
import type LocaleDropdownNavbarItemType from "@theme/NavbarItem/LocaleDropdownNavbarItem";
import React, { type ReactNode } from "react";
import { localeFromPath, STORAGE_KEY } from "../../../utils/locale";

type Props = WrapperProps<typeof LocaleDropdownNavbarItemType>;

export default function LocaleDropdownNavbarItemWrapper(props: Readonly<Props>): ReactNode {
    const handleClick = (e: React.MouseEvent): void => {
        const link = (e.target as HTMLElement).closest("a");
        const href = link?.getAttribute("href");
        if (!link || !href || href.startsWith("#")) return;

        const url = new URL(link.href, location.origin);
        if (url.origin !== location.origin) return;

        try {
            localStorage.setItem(STORAGE_KEY, localeFromPath(url.pathname));
        } catch (error) {
            console.warn("Preferred locale could not be saved to localStorage:", error);
        }
    };

    return (
        <span onClickCapture={handleClick} style={{ display: "contents" }}>
            <LocaleDropdownNavbarItem {...props} />
        </span>
    );
}
