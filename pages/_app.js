import '../styles/globals.css'
import Layout from "../componenets/layout/layout";

export default function App({Component, pageProps}) {
    return (<Layout>
        <Component {...pageProps} />
    </Layout>)
}
