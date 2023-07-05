'use client'
import React from 'react'
import { createPortal } from 'react-dom'
import css from './page.module.scss'
import Image from 'next/image'
import { ContentBlock } from 'common/components/content'
import Link from 'common/components/link'
import HeroSphere from 'common/assets/images/hero-sphere.png'
import MainLogo from 'common/assets/images/main-logo.svg'
import PortalTextLogo from 'common/assets/images/text-logo.svg'
import FooterLogo from 'common/assets/images/footer-logo.svg'
import DiscordIcon from 'common/assets/icons/discord.svg'
import CrossIcon from 'common/assets/icons/cross.svg'
import HamburgerIcon from 'common/assets/icons/hamburger.svg'
import GithubIcon from 'common/assets/icons/github.svg'
import Spline from '@splinetool/react-spline'

const menuItems = () => [
  {
    text: 'Get Started',
    url: '#get-started',
  },
  {
    text: 'Portal',
    url: '#portal',
  },
  {
    text: 'Contributors',
    url: '#contributors',
  },
  {
    text: 'Resources',
    url: '#resources',
  },
  {
    text: 'Blog',
    url: '#blog',
  },
]

const VerticalMenuItems = () => {
  return (
    <div className={css['vertical-menu']}>
      {menuItems().map((menuItem: any) => {
        return (
          <Link className={menuItem.customClass} key={menuItem.text} href={menuItem.url}>
            {menuItem.text}
          </Link>
        )
      })}

      <div className={css['github-discord']}>
        <GithubIcon />
        <DiscordIcon />
      </div>
    </div>
  )
}

const Menu = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen, mounted])

  if (!mounted) return null

  return (
    <div className={`${css['menu-container']} section`}>
      <div className={`${css['menu']}`}>
        <MainLogo className={css['logo']} />

        {/* Desktop */}
        <div className={css['items']}>
          {menuItems().map((menuItem: any) => {
            return (
              <Link className={menuItem.customClass} key={menuItem.text} href={menuItem.url}>
                {menuItem.text}
              </Link>
            )
          })}

          <GithubIcon />
          <DiscordIcon />
        </div>

        {/* Mobile */}
        <div className={css['mobile-toggle']}>
          <HamburgerIcon onClick={() => setMobileOpen(!mobileOpen)} />
        </div>

        {createPortal(
          <div className={`${mobileOpen ? css['open'] : ''} ${css['foldout']}`}>
            <div className="section">
              <div className={css['content']}>
                <div className={css['top']}>
                  <VerticalMenuItems />
                </div>

                <div className={css['bottom']}>
                  <PortalTextLogo />
                  <p className="gray">Supported by Ethereum Foundation</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <Menu />
      <ContentBlock id="get-started">
        <div className={css['hero']}>
          <div className={css['background']}>
            <Spline
              scene="https://prod.spline.design/UbLwthoAHBUOi3Ni/scene.splinecode"
              onLoad={application => {
                application.setZoom(0.5)
              }}
            />
            {/* <Image src={HeroSphere} alt="Futuristic Sphere" /> */}
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
      <div className={`${css['hero-addendum']} section padding-top padding-bottom`}>
        <div className="grid col-2 uneven-40">
          <div className={css['left']}>
            <p className="page-header">Research & Development</p>
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
      <ContentBlock number={1} id="portal">
        <div className="section padding-top padding-bottom">
          <p>hehe</p>
          <p>haehea</p>
        </div>
      </ContentBlock>
      <ContentBlock number={2} id="contributors" color="black">
        <div className="section padding-top padding-bottom">
          <p>hehe</p>
          <p>haehea</p>
        </div>
      </ContentBlock>
      <ContentBlock number={3} id="resources">
        <div className="section padding-top padding-bottom">
          <p>hehe</p>
          <p>haehea</p>
        </div>
      </ContentBlock>
      {/* <ContentBlock number={4} id="blog">
        ContentBlock 4
      </ContentBlock> */}

      <footer className={`${css['footer']} padding-top`}>
        <div className="section">
          <div className="grid col-2 uneven-60">
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

              {/* <div className={css['github-discord']}>

                <GithubIcon />
                <DiscordIcon />
              </div> */}
            </div>
          </div>
          <div className={css['footer-logo']}>
            <FooterLogo />
          </div>
        </div>

        <div className={css['meta']}>
          <div className="section">
            <div className={css['split']}>
              <p className="tiny-text">© 2023. All rights reserved. Crafted with ❤️ in the ethers. </p>
              <p className="tiny-text">Supported by Ethereum Foundation</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
