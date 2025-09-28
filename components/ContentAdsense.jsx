import parse, { domToReact } from 'html-react-parser';
import AdsenseCode from './AdsenseCode';


export default function ContentAdsense({ html }) {
    let paragraphCount = 0;
    let adInserted = false;

    const options = {
        replace: (node) => {
            if (node.type === 'tag' && node.name === 'p') {
                paragraphCount++;

                if (paragraphCount === 1 && !adInserted) {
                    adInserted = true;

                    return (
                        <>
                            <p>{domToReact(node.children, options)}</p>
                            <AdsenseCode />
                        </>
                    );
                }
            }
        },
    };

    const contentWithAd = parse(html, options);

    return <>{contentWithAd}</>;
}
