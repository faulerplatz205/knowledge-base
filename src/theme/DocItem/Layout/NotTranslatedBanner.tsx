import type { ReactNode } from "react";
import Admonition from "@theme/Admonition";
import Translate from "@docusaurus/Translate";

export default function NotTranslatedBanner(): ReactNode {
    return (
        <Admonition type="info" >
            <p>
                <Translate id="doc.notTranslated" description="Banner on a doc page that is shown in English because no translation exists yet">
                    This page has not been translated yet
                </Translate>
            </p>
        </Admonition>
    );
}
