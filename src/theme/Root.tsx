import React, { type ReactNode } from "react";
import { FeedbackSectionProvider } from "../utils/feedbackSection";

export default function Root({ children }: Readonly<{ children: ReactNode }>): ReactNode {
    return <FeedbackSectionProvider>{children}</FeedbackSectionProvider>;
}
