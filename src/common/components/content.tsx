import React from 'react'
import { ReactNode } from 'react'
import css from './content.module.scss'
import Image, { StaticImageData } from 'next/image'
import Flickity from 'react-flickity-component'

/* Content block */
type ContentBlockProps = {
  children: ReactNode
  color?: 'dark'
  anchor?: string
  number?: number
  organicHeight?: boolean
  unpadded?: boolean
}

const leftPadNumber = (number: number) => {
  if (number < 10) {
    return `0${number}`
  }

  return number
}

export const ContentBlock = (props: ContentBlockProps) => {
  let className = css['content']

  if (props.color) className += ` ${css[props.color]}`
  if (props.organicHeight) className += ` ${css['grow-organically']}`

  return (
    <div className={className} id={props.anchor}>
      {props.number && (
        <div className={`${css['number']} section`}>
          <p>{leftPadNumber(props.number)}</p>
        </div>
      )}
      {props.unpadded ? props.children : <div className="section padding-top padding-bottom">{props.children}</div>}
    </div>
  )
}
/* Content block end */

/* Content header */
type HeaderProps = {
  title: string
  className?: string
  children?: ReactNode
}

export const ContentHeader = (props: HeaderProps) => {
  let className = `border-bottom padding-bottom margin-bottom ${css['header']}`

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <h2 className="content-header">{props.title}</h2>
      <div>{props.children}</div>
    </div>
  )
}
/* Header End */

/* Accordion */
type AccordionProps = {
  className?: string
  children?: ReactNode
  items: {
    title: string
    content: ReactNode
  }[]
}

export const Accordion = (props: AccordionProps) => {
  let className = css['accordion']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={css['accordion']}>
      {props.items.map((item, index) => {
        const open = true

        return (
          <div
            key={item.title || index}
            className={`${css['accordion-item']} padding-bottom-less padding-top-less`}
            id={item.title}
          >
            <p className="gray large-text">{item.title}</p>
            {open && <div className="margin-top-less">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
/* Header End */

/* Cards begin */
type SquareCardProps = {
  title: string
  children: ReactNode
}

export const SquareCard = (props: SquareCardProps) => {
  return (
    <div className={`${css['square-card']}`}>
      <div className="aspect square">
        <div className={css['square-card-inner-container']}>
          <div className={css['card-content']}>
            <p className={css['title']}>{props.title}</p>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

type ImageCardProps = {
  title: string
  image: StaticImageData
  imageAlt: string
  children: ReactNode
}

export const ImageCard = (props: ImageCardProps) => {
  return (
    <div className={`${css['image-card']}`}>
      <div className="aspect tall">
        <div className={css['image']}>
          <Image src={props.image} alt={props.imageAlt} />
        </div>
      </div>
      <p className={`${css['title']} margin-top-less bold`}>{props.title}</p>
      <div className={`gray margin-top-much-less margin-bottom-much-less ${css['children']}`}>{props.children}</div>
      <p className="bold small-text">Learn more 🡪</p>
    </div>
  )
}

type CardsProps = {
  children: ReactNode[] | ReactNode
  squareCards?: boolean
}

export const Cards = (props: CardsProps) => {
  const flickityRef = React.useRef<any>()
  const flickityOptions = {
    freeScroll: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    draggable: true,
  }

  let className = css['flickity-container']

  if (props.squareCards) {
    className += css['square-cards']
  }

  React.useEffect(() => {
    console.log(flickityRef.current, 'hell')
  }, [])

  return (
    <div className={className} style={{ '--nCards': React.Children.count(props.children) }}>
      <Flickity
        // className={'carousel'} // default ''
        className={css['cards']}
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
        flickityRef={ref => (flickityRef.current = ref)}
      >
        {props.children}
      </Flickity>
    </div>
  )
}

/* Cards end */
