import React, { useRef, useState, type FormEvent, type ReactNode } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import { useFeedbackSection } from "../../../utils/feedbackSection";
import styles from "./styles.module.css";

type Rating = "up" | "down";
type Status = "idle" | "sending" | "success" | "error";

const MAX_COMMENT = 500;
const MAX_CONTACT = 200;

const ThumbUp = (): ReactNode => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
);

const ThumbDown = (): ReactNode => (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 14V2" />
        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
);

export default function FeedbackNavbarItem(): ReactNode {
    const { siteConfig, i18n } = useDocusaurusContext();
    const { pathname } = useLocation();
    const { section } = useFeedbackSection();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [ rating, setRating ] = useState<Rating | null>(null);
    const [ comment, setComment ] = useState("");
    const [ status, setStatus ] = useState<Status>("idle");

    const endpoint = siteConfig.customFields?.feedbackEndpoint as string;

    const open = (): void => {
        setStatus("idle");
        dialogRef.current?.showModal();
    };

    const close = (): void => {
        dialogRef.current?.close();
    };

    const submit = async(event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!rating) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        setStatus("sending");
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rating,
                    comment,
                    contact: data.get("contact"),
                    website: data.get("website"),
                    path: pathname,
                    locale: i18n.currentLocale,
                }),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            form.reset();
            setRating(null);
            setComment("");
            setStatus("success");
        } catch (error) {
            console.error("Feedback submission failed:", error);
            setStatus("error");
        }
    };

    return (
        <>
            <button type="button" className={styles.button} onClick={open}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-2 12H6v-2h12v2Zm0-3H6V9h12v2Zm0-3H6V6h12v2Z" />
                </svg>
                <span className={styles.label}>
                    <Translate id="feedback.button">Feedback</Translate>
                </span>
            </button>
            <dialog
                ref={dialogRef}
                className={styles.dialog}
                onClick={(event) => {
                    if (event.target === dialogRef.current) close();
                }}
            >
                <div className={styles.header}>
                    <h2>
                        <Translate id="feedback.title">Feedback</Translate>
                        {` (${section ?? translate({ id: "feedback.home", message: "Home" })})`}
                    </h2>
                    <button type="button" className={styles.close} onClick={close} aria-label={translate({ id: "feedback.close", message: "Close" })}>
                        &times;
                    </button>
                </div>
                {status === "success" ? (
                    <div className={styles.success}>
                        <p><Translate id="feedback.success">Thank you for the feedback.</Translate></p>
                        <button type="button" className="button button--primary" onClick={close}>
                            <Translate id="feedback.close">Close</Translate>
                        </button>
                    </div>
                ) : (
                    <form onSubmit={(event) => void submit(event)} className={styles.form}>
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.question}>
                                <Translate id="feedback.question">What do you think about this page?</Translate>
                            </legend>
                            <div className={styles.rating}>
                                <label className={styles.option}>
                                    <input type="radio" name="rating" value="up" checked={rating === "up"} onChange={() => setRating("up")} />
                                    <ThumbUp />
                                    <span><Translate id="feedback.helpful">Helpful</Translate></span>
                                </label>
                                <label className={styles.option}>
                                    <input type="radio" name="rating" value="down" checked={rating === "down"} onChange={() => setRating("down")} />
                                    <ThumbDown />
                                    <span><Translate id="feedback.notHelpful">Not helpful</Translate></span>
                                </label>
                            </div>
                        </fieldset>
                        <label className={styles.field}>
                            <span><Translate id="feedback.contact">Name or Email (optional)</Translate></span>
                            <input name="contact" type="text" maxLength={MAX_CONTACT} autoComplete="off" />
                        </label>
                        <label className={styles.field}>
                            <span><Translate id="feedback.comment">Comment (optional)</Translate></span>
                            <textarea
                                name="comment"
                                maxLength={MAX_COMMENT}
                                rows={8}
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                        </label>
                        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
                        {status === "error" && (
                            <p className={styles.error} role="alert">
                                <Translate id="feedback.error">The feedback could not be sent. Please try again later.</Translate>
                            </p>
                        )}
                        <div className={styles.footer}>
                            <span className={styles.counter}>{comment.length} / {MAX_COMMENT}</span>
                            <button type="submit" className="button button--primary" disabled={!rating || status === "sending"}>
                                <Translate id="feedback.submit">Submit</Translate>
                            </button>
                        </div>
                    </form>
                )}
            </dialog>
        </>
    );
}
