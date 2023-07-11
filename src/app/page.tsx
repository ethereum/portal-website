'use client'
import React from 'react'
import css from './page.module.scss'
import {
  ContentBlock,
  ContentHeader,
  Accordion,
  Cards,
  ImageCard,
  SquareCardVariation1,
} from 'common/components/content'
import Link from 'common/components/link'
import MainLogo from 'common/assets/images/main-logo.svg'
import PortalTextLogo from 'common/assets/images/text-logo.svg'
import FooterLogo from 'common/assets/images/footer-logo.svg'
import { menuItems } from './menu'
import CardImage1 from 'common/assets/images/image-1.png'
import CardImage2 from 'common/assets/images/image-2.png'
import CardImage3 from 'common/assets/images/image-3.png'
import CardImage4 from 'common/assets/images/image-4.png'
import ArrowDownLeftIcon from 'common/assets/icons/arrow-down-left.svg'
import Spline from '@splinetool/react-spline'
import ClientsBackground from 'common/assets/images/clients-background.png'

const Home = () => {
  return (
    <div>
      <ContentBlock anchor="get-started" unpadded>
        <div className={css['hero']}>
          <div className={css['background']}>
            <Spline
              scene="https://prod.spline.design/UbLwthoAHBUOi3Ni/scene.splinecode"
              onLoad={application => {
                application.setZoom(0.5)
              }}
            />
          </div>
          <div className={css['center']}>
            <div className="section">
              <PortalTextLogo />
              <p className={`grey ${css['logo-subtext']}`}>Decentralized lightweight access for the Ethereum Network</p>
            </div>
          </div>
          <div className={css['bottom-left']}>
            <div className="section">
              <p className="big-text">🡣 Discover Portal</p>
            </div>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock organicHeight unpadded>
        <div className={`${css['hero-addendum']} section padding-top padding-bottom`}>
          <div className="grid col-2 uneven-40">
            <div className={css['left']}>
              <p className="content-header">Research & Development</p>
              <p className="big-text">View Contributors 🡪</p>
            </div>
            <div className={css['right']}>
              <p className="big-text">
                Ethereum Portal is an open source, multi-team research & development effort.{' '}
                <span className="grey">
                  If you&apos;re interested in helping to contribute towards the design and implementation, join the
                  on-going conversation
                </span>{' '}
                on the Portal discord community.
              </p>

              <div className={css['cta-links']}>
                <p>Github 🡕</p>
                <p>Implementer Calls 🡕</p>
                <p>Discord 🡕</p>
              </div>

              <MainLogo />
            </div>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock organicHeight number={1} anchor="portal">
        <p className={`${css['featured-resources-header']} gray large-text`}>
          Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the
          Ethereum Network.
        </p>

        <div className={css['featured-resources']}>
          <ContentHeader className="padding-top" title="Featured Resources">
            <p className={css['arrow']}>
              <ArrowDownLeftIcon />
            </p>
          </ContentHeader>

          <Cards>
            <ImageCard key="1" image={CardImage2} title="Get Started" imageAlt="Get Started card">
              Learn the basics of the Ethereum Portal Research and Development
            </ImageCard>
            <ImageCard key="2" image={CardImage1} title="Lessons Learnt" imageAlt="Get Started card">
              Learn the basics of the Ethereum Portal Research and Development
            </ImageCard>
            <ImageCard key="3" image={CardImage3} title="Discover Portal  - Video" imageAlt="Get Started card">
              Learn the basics of the Ethereum Portal Research and Development
            </ImageCard>
            <ImageCard key="4" image={CardImage4} title="FAQ" imageAlt="Get Started card">
              Learn the basics of the Ethereum Portal Research and Development
            </ImageCard>
          </Cards>
        </div>
      </ContentBlock>
      <ContentBlock
        number={2}
        anchor="contributors"
        color="dark"
        organicHeight
        backgroundImage={ClientsBackground}
        backgroundImageAlt="Ethereum logo futuristic setting"
      >
        <div className={css['clients']}>
          <div className={css['portal-text-logo']}>
            <PortalTextLogo />
          </div>

          <p className={css['header']}>Clients</p>

          <p className={`${css['description']} margin-top margin-bottom big-text`}>
            Implementing a multi-client approach is crucial to ensuring the security, decentralization, and overall
            health of the Ethereum network.{' '}
            <span className="grey">
              Portal network is building three different clients from the start to ensure a decentralised strategy from
              day one.
            </span>
          </p>

          <div className={css['client-cards']}>
            <SquareCardVariation1
              title="TRIN"
              github="https://github.com/repo"
              meta={
                <>
                  <p>Language: Rust</p>
                  <p>Ethereum Foundation</p>
                </>
              }
              description="Learn the basics of the Ethereum Portal Research and Development"
            ></SquareCardVariation1>
            <SquareCardVariation1
              title="NIMBUS"
              github="https://github.com/repo"
              meta={
                <>
                  <p>Language: Rust</p>
                  <p>Ethereum Foundation</p>
                </>
              }
              description="Learn the basics of the Ethereum Portal Research and Development"
            ></SquareCardVariation1>
            <SquareCardVariation1
              title="ULTRALIGHT"
              github="https://github.com/repo"
              meta={
                <>
                  <p>Language: Rust</p>
                  <p>Ethereum Foundation</p>
                </>
              }
              description="Learn the basics of the Ethereum Portal Research and Development"
            ></SquareCardVariation1>
          </div>

          <div className={css['bottom-left']}>
            <p className="big-text margin-top-less">Learn more 🡪</p>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock number={3} anchor="resources" organicHeight>
        <ContentHeader title="This is an example content block"></ContentHeader>
        <div className="grid col-2">
          <p>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </ContentBlock>
      <ContentBlock number={4} anchor="blog" color="dark" organicHeight>
        <ContentHeader title="Frequently Asked Questions"></ContentHeader>
        <Accordion
          items={[
            {
              title:
                'Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the Ethereum protocol.',
              content: (
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </p>
              ),
            },
            {
              title:
                'Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the Ethereum protocol.',
              content: (
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </p>
              ),
            },
            {
              title:
                'Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the Ethereum protocol.',
              content: (
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </p>
              ),
            },
            {
              title:
                'Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the Ethereum protocol.',
              content: (
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </p>
              ),
            },
            {
              title:
                'Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the Ethereum protocol.',
              content: (
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </p>
              ),
            },
            {
              title:
                'Portal aims to build a decentralized peer-to-peer network that enables lightweight protocol access to the Ethereum protocol.',
              content: (
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content here', making it look like
                  readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                  humour and the like).
                </p>
              ),
            },
          ]}
        ></Accordion>
      </ContentBlock>

      <footer className={`${css['footer']} padding-top`}>
        <div className="section">
          <div className="grid col-2 uneven-60 padding-bottom padding-top-less">
            <p className={`extra-large-text ${css['header']}`}>
              Making the Ethereum Network lightweight and accessible.
            </p>

            <div className={css['vertical-menu-footer']}>
              {menuItems().map((menuItem: any) => {
                return (
                  <Link className={menuItem.customClass} key={menuItem.text} href={menuItem.url}>
                    {menuItem.text}
                  </Link>
                )
              })}

              <p className={css['github-discord']}>Github / Discord</p>
            </div>
          </div>
          <div className={css['footer-logo']}>
            <FooterLogo />
          </div>
        </div>

        <div className={css['meta']}>
          <div className="section">
            <div className={css['split']}>
              <p>© 2023. All rights reserved. Crafted with ❤️ in the ethers. </p>
              <p>Supported by Ethereum Foundation</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
