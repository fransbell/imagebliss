import { MantineProvider, NormalizeCSS } from "@mantine/styles"
import "./styles/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <NormalizeCSS />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
