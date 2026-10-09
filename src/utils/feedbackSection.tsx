import React, { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface FeedbackSection {
    section: string | null;
    setSection: (section: string | null) => void;
}

const FeedbackSectionContext = createContext<FeedbackSection>({
    section: null,
    setSection: () => undefined,
});

/** Carries the sidebar category of the current doc page from the doc layout to the navbar. */
export function FeedbackSectionProvider({ children }: Readonly<{ children: ReactNode }>): ReactNode {
    const [ section, setSection ] = useState<string | null>(null);
    const value = useMemo(() => ({ section, setSection }), [ section ]);
    return <FeedbackSectionContext.Provider value={value}>{children}</FeedbackSectionContext.Provider>;
}

export function useFeedbackSection(): FeedbackSection {
    return useContext(FeedbackSectionContext);
}
