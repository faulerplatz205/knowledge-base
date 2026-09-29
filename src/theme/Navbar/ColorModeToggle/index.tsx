import type { ReactElement} from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

type ThemeStyle = "light" | "dark" | "homepage";

const STORAGE_KEY = "theme-style";

const SunIcon = (): ReactElement => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
);

const MoonIcon = (): ReactElement => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
);

const TerminalIcon = (): ReactElement => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
);

const themeOptions: { value: ThemeStyle; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <SunIcon /> },
    { value: "dark", label: "Dark", icon: <MoonIcon /> },
    { value: "homepage", label: "Homepage", icon: <TerminalIcon /> },
];

function getStoredThemeStyle(): ThemeStyle | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY) as ThemeStyle | null;
}

interface Props {
    className?: string;
}

export default function ColorModeToggle({ className }: Props): React.ReactNode {
    const { colorMode, setColorMode } = useColorMode();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isHomepage, setIsHomepage ] = useState(false);
    const activeStyle: ThemeStyle = isHomepage ? "homepage" : colorMode;
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (getStoredThemeStyle() === "homepage") {
            setIsHomepage(true);
            setColorMode("dark");
            document.documentElement.setAttribute("data-theme-style", "homepage");
        }
    }, [ setColorMode ]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = useCallback((style: ThemeStyle) => {
        setIsHomepage(style === "homepage");
        setIsOpen(false);
        localStorage.setItem(STORAGE_KEY, style);

        if (style === "homepage") {
            setColorMode("dark");
            document.documentElement.setAttribute("data-theme-style", "homepage");
        } else {
            document.documentElement.removeAttribute("data-theme-style");
            setColorMode(style);
        }
    }, [ setColorMode ]);

    const activeOption = themeOptions.find(o => o.value === activeStyle) ?? themeOptions[0];

    return (
        <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`} ref={dropdownRef}>
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(prev => !prev)}
                aria-label="Select theme"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                type="button"
            >
                <span className={styles.icon}>{activeOption.icon}</span>
                <span className={styles.label}>{activeOption.label}</span>
                <span className={styles.chevron} aria-hidden="true">
                    <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <ul className={styles.dropdown} role="listbox" aria-label="Theme options">
                    {themeOptions.map(option => (
                        <li key={option.value} role="option" aria-selected={option.value === activeStyle}>
                            <button
                                className={`${styles.option} ${option.value === activeStyle ? styles.active : ""}`}
                                onClick={() => handleSelect(option.value)}
                                type="button"
                            >
                                <span className={styles.optionIcon}>{option.icon}</span>
                                <span>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
