import { ReactNode } from 'react'
import css from './content.module.scss'

type ContentBlockProps = {
  children: ReactNode
  color?: 'black'
  id?: string
  number?: number
  title?: any
}

const leftPadNumber = (number: number) => {
  if (number < 10) {
    return `0${number}`
  }

  return number
}

const ContentBlock = (props: ContentBlockProps) => {
  let className = css['content']

  if (props.color) className += ` ${css[props.color]}`

  return (
    <div className={className} id={props.id}>
      {props.number && (
        <div className={`${css['number']} section`}>
          <p>{leftPadNumber(props.number)}</p>
        </div>
      )}
      {props.children}
    </div>
  )
}

export { ContentBlock }
