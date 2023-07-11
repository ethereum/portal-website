'use client'
import React from 'react'
import { createPortal } from 'react-dom'
import css from './menu.module.scss'
import Link from 'common/components/link'
import DiscordIcon from 'common/assets/icons/discord.svg'
import HamburgerIcon from 'common/assets/icons/hamburger.svg'
import MainLogo from 'common/assets/images/main-logo.svg'
import GithubIcon from 'common/assets/icons/github.svg'
import PortalTextLogo from 'common/assets/images/text-logo.svg'

export const menuItems = () => [
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

export const Menu = () => {
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
