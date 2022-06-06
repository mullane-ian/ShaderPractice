import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Image(props) {
  const ref = useRef();
  const group = useRef();

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  
  )
}
