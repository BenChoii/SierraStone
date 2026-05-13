/**
 * Answer-first block rendered immediately under the H1 on every
 * key landing page. Engineered for featured-snippet and AI-Overview
 * extraction:
 *  - The <p> answer is 40-60 words, definition-style, so it gets
 *    pulled as a paragraph snippet.
 *  - The <ul> bullets are 4-5 short factual statements so they
 *    get pulled as a list snippet.
 *  - Both formats compete for different snippet types on the same
 *    page, doubling the surface area for SERP capture.
 */
export default function TldrBlock({ answer, points }) {
    return (
        <div className="tldr-block">
            <p className="tldr-block__answer">{answer}</p>
            {points && points.length > 0 && (
                <ul className="tldr-block__points">
                    {points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
