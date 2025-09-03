import Document, { Html, Head, Main, NextScript } from 'next/document';

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

          {/* <script src="https://www.googletagmanager.com/gtag/js?id=G-BN0814FKHT" />
          <script type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `{window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-BN0814FKHT');}`
            }}
          /> */}

        </Head>

        <body>
          <Main />
          <NextScript />

        </body>
      </Html>
    );
  }
}
