import {MouseEvent, RefObject, useEffect} from "react";


export default function useFlashlight(
  ref: RefObject<HTMLElement>,
  spotlightColor: string,
  withBackgroundColor: string,
) {
  const maxSize = 100
  let size = 0,
    at = { x: 0, y: 0 },
    state: 'enter' | 'leave' | 'rerender' = 'leave',
    enterTimer: NodeJS.Timer,
    leaveTimer: NodeJS.Timer,
    mainRender: NodeJS.Timer

  const clearBg = () => {
    if (ref.current && ref.current.style.background !== '') {
      ref.current.style.background = ''
    }
  }

  const setPosition = (event: MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const element: HTMLElement = ref.current
      const { left, top } = element.getBoundingClientRect()
      at = { x: event.clientX - left, y: event.clientY - top }
    }
  }

  const renderFlashLight = () => {
    if (ref.current) {
      if (state === 'enter') {
        const gradientCircle = `circle at ${at.x}px ${at.y}px`
        const colorTransition = `${spotlightColor} 0px, rgba(255, 255, 255, 0.01) ${
          (size * 100) / maxSize
        }px`
        ref.current.style.background = `radial-gradient(${gradientCircle}, ${colorTransition}) no-repeat ${withBackgroundColor}`
      } else {
        clearBg()
      }
    }
  }

  const flashlightAppear = () => {
    console.log(ref.current)

    if (ref.current) {
      size += 2.5
      if (size >= maxSize) {
        clearInterval(enterTimer)
      }
    }
  }

  const flashlightDisappear = () => {
    size -= 2.5
    if (size <= 0) {
      state = 'leave'
      // clearInterval(mainRender)
      clearInterval(leaveTimer)
      clearInterval(enterTimer)
      clearBg()
    }
  }

  useEffect(() => {
    mainRender = setInterval(renderFlashLight, 3)
    return () => {
      clearInterval(mainRender)
    }
  })

  return{
      onMouseEnter: (event: MouseEvent<HTMLDivElement>) => {
        // clearInterval(mainRender)
        // mainRender = setInterval(renderFlashLight, 3)

        console.log('enter')
        state = 'enter'
        clearInterval(leaveTimer)
        clearInterval(enterTimer)
        enterTimer = setInterval(flashlightAppear, 1)

        setPosition(event)
      },
      onMouseMove: (event:MouseEvent<HTMLDivElement>) => {
        setPosition(event)
      },
      onMouseLeave: (event: MouseEvent<HTMLDivElement>) => {
        clearInterval(leaveTimer)
        clearInterval(enterTimer)
        leaveTimer = setInterval(flashlightDisappear, 1)
        setPosition(event)
      },
    }
}
