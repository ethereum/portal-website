import { DocsThemeConfig, Navbar } from 'nextra-theme-docs'
import { portalLogo } from './components/logo'

const config: DocsThemeConfig = {
  logo: portalLogo,
  project: {
    link: 'https://github.com/ethereum/portal-network-specs',
  },
  chat: {
    link: 'https://discord.gg/QcD3wWSp',
  },
  docsRepositoryBase: 'https://github.com/ethereum/portal-network-specs',
  footer: {
    text: 'Portal Network docs',
  }
};


const CustomHead: React.FC = () => (
  <>
    <meta name="og:title" content="Portal network" />
    <meta name="og:description" content="Portal Network: lightweight access to Ethereum" />
    <meta name="og:image" content="public/logos/EthPortalNetworkLogo.png" />
  </>
);

export default { ...config, head: CustomHead };
