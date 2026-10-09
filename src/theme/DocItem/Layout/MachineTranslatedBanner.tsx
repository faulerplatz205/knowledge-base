import type { ReactNode } from "react";
import Admonition from "@theme/Admonition";
import Translate from "@docusaurus/Translate";

interface Props {
    readonly originalPath: string;
}

export default function MachineTranslatedBanner({ originalPath }: Props): ReactNode {
    return (
        <Admonition type="note" >
            <p>
                <Translate
                    id="doc.machineTranslated"
                    description="Banner on a doc page that was translated automatically from English; {originalLink} is the link to the English page"
                    values={{
                        // Plain <a> instead of <Link>: the English page belongs to a different locale build
                        originalLink: (
                            <a href={originalPath} lang="en">
                                <Translate id="doc.machineTranslated.originalLink" description="Text of the link to the English original of a machine-translated doc page">
                                    English original
                                </Translate>
                            </a>
                        ),
                    }}
                >
                    {"This page was translated automatically and may contain errors. The {originalLink} is authoritative."}
                </Translate>
            </p>
        </Admonition>
    );
}
