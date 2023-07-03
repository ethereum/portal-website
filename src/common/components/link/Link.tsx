import React, { ReactNode } from 'react'
import Link from 'next/link'
import LinkIndicator from 'common/assets/icons/link-indicator.svg'
import css from './link.module.scss'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'

type LinkProps = {
  children: ReactNode
  indicateExternal?: boolean // Whether or not to add an external link indicator (if the url is a FQDN)
  allowDrag?: boolean
  to: string
  [key: string]: any
}

export const useDraggableLink = () => {
  const dragging = React.useRef(false)

  return {
    onMouseDown: () => {
      dragging.current = false
    },
    onMouseMove: () => {
      dragging.current = true
    },
    onClick: (e: React.SyntheticEvent) => {
      e.stopPropagation()

      if (dragging.current) {
        e.preventDefault()
      }
    },
    draggable: false,
  }
}

const WrappedLink = React.forwardRef(
  ({ children, indicateExternal, external, allowDrag, onClick, href, ...rest }: LinkProps, ref: any) => {
    const isMailTo = href.startsWith('mailto:')
    const linkAttributes = {
      ...rest,
      className: rest.className ? `${rest.className} ${css['link']}` : `${css['link']}`,
      ...useDraggableLink(),
      onClick,
    }

    if (isMailTo) {
      return (
        <a href={href} ref={ref} {...linkAttributes}>
          {children}
        </a>
      )
    }

    // Detects fully qualified domain name
    // One caveat to this approach is that you could link to a devcon.org page via a FQDN, and it would be detected as external:
    // Make sure to always use relative links for internal navigation
    const isExternal = href.match(/^([a-z0-9]*:|.{0})\/\/.*$/)

    // External links have no use of next Link component
    if (isExternal) {
      return (
        <a href={href} ref={ref} {...linkAttributes} target="_blank" rel="noopener noreferrer">
          <span className={css['link']} data-type="link-text">
            {children}
          </span>
          {indicateExternal && (
            <span className={css['external-indicator']} data-type="external-indicator">
              &nbsp;
              <LinkIndicator className={`${css['icon']} icon`} />
            </span>
          )}
        </a>
      )
    }

    if (href.startsWith('#')) {
      return (
        <AnchorLink href={href} {...linkAttributes} offset={125}>
          {children}
        </AnchorLink>
      )
    }

    return (
      <Link href={href} {...linkAttributes}>
        <span className={css['link']} data-type="link-text">
          {children}
        </span>
      </Link>
    )
  }
)

WrappedLink.displayName = 'LinkComponent'

export default WrappedLink
