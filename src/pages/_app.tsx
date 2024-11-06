import '@/globals.css'

export default function App({ Component, pageProps }: any) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => {
    return (
      <div>
        <div>common layout</div>
        <div>{page}</div>
      </div>
    )
  })
 
  return getLayout(<Component {...pageProps} />)
}