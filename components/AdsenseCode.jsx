// components/AdInArticle.js
import { useEffect } from 'react';

export default function AdsenseCode() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-4311422461872967"
            data-ad-slot="1462383458"
        />
    );
}
