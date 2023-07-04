const title = 'Ethereum Portal Ntwork'
// TODO: Add meta
const description = 'Some description'

const Head = () => {
  return (
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1,minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover"
      />
      <meta name="description" content={description} />

      <meta property="og:site_name" content="Ethereum Portal Network" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:url" content="https://ethereum.foundation" /> */}
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content="https://ethereum.foundation/assets/EF-website-thumbnail.jpg" /> */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {/* <meta name="twitter:image" content="https://ethereum.foundation/assets/EF-website-thumbnail.jpg" /> */}
    </head>
  )
}

export default Head
