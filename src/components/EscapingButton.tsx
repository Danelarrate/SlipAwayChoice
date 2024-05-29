'use client'
import { useState, useEffect, useRef } from 'react'

const EscapingButton = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hidden, setHidden] = useState(false)
  const getRandomPosition = (mouseX: number = 0, mouseY: number = 0) => {
    if (containerRef.current == null || buttonRef.current == null)
      return { x: 0, y: 0 }
    const containerRect = containerRef.current?.getBoundingClientRect()
    const buttonRect = buttonRef.current?.getBoundingClientRect()

    const maxX = containerRect.width - buttonRect.width
    const maxY = containerRect.height - buttonRect.height

    let randomX, randomY

    do {
      randomX = Math.floor(Math.random() * maxX)
      randomY = Math.floor(Math.random() * maxY)
    } while (
      randomX < mouseX + 50 &&
      randomX > mouseX - 50 &&
      randomY < mouseY + 50 &&
      randomY > mouseY - 50
    )

    return { x: randomX, y: randomY }
  }

  const moveButton = (mouseX = 0, mouseY = 0) => {
    if (buttonRef.current && containerRef.current) {
      const { x, y } = getRandomPosition(mouseX, mouseY)
      buttonRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  const handleMouseEnter = (event: React.MouseEvent) => {
    const mouseX =
      event.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0)
    const mouseY =
      event.clientY - (containerRef.current?.getBoundingClientRect().top ?? 0)
    moveButton(mouseX, mouseY)
  }

  const handleClick = () => {
    // TODO add teleport animation
    setHidden(true)
    const newPosition = getRandomPosition()
    moveButton(newPosition.x, newPosition.y)
    setTimeout(() => setHidden(false), 500)
  }
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '1px solid red'
      }}
    >
      <div
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        style={{
          position: 'absolute',
          transition: hidden ? 'none' : 'transform 0.3s ease-out',
          opacity: hidden ? 0 : 1
        }}
        className='p-8'
      >
        <button className='bg-red-500 p-2' onClick={handleClick}>
          ¡Intenta Clicarme!
        </button>
      </div>
    </div>
  )
}

export default EscapingButton
