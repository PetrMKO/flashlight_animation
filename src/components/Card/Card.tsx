import React, {ReactNode, useRef} from 'react';
import './Card.css'
import useFlashlight from "../../hooks/useFlashlight";

type CardProps = {
  children?: ReactNode
  bgColor: string
}

const Card = ({children, bgColor}:CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const {onMouseEnter, onMouseLeave, onMouseMove} = useFlashlight(
    cardRef,
    'rgba(255, 255, 255, 0.8)',
    bgColor,
  )
  return (
    <div className={'card'} ref={cardRef} onMouseEnter={onMouseEnter} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  )
}

export default Card;
