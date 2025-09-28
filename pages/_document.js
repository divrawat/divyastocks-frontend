import { APP_NAME, DOMAIN } from '@/config';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,

    };
  }

  render() {
    return (
      <Html lang='hi'>
        <Head>
          <link rel="alternate" type="application/rss+xml" title={APP_NAME} href={`${DOMAIN}/rss.xml`}></link>
          {/* <script src="https://www.googletagmanager.com/gtag/js?id=G-BN0814FKHT" />
          <script type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `{window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-BN0814FKHT');}`
            }}
          /> */}


          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4311422461872967"
            crossorigin="anonymous"></script>

        </Head>

        <body>
          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}
