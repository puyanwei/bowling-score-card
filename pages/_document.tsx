import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap'
          rel='stylesheet'
        />
      </Head>
      <html>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  )
}
