import { Suspense, useMemo, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {Preload, Image as ImageImpl, OrbitControls } from '@react-three/drei'
import Bird from '../components/Bird'
import Loader from '../components/Loader'

export default function BirdsPage() {
  const birds = useMemo(
    () =>
      new Array(10).fill().map((_, index) => {
        const x =
          (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
        const y = -10 + Math.random() * 20
        const z = -5 + Math.random() * 10
        const bird = ['stork', 'parrot', 'flamingo'][
          Math.round(Math.random() * 2)
        ]
        const speed = bird === 'stork' ? 0.5 : bird === 'flamingo' ? 2 : 5
        const factor =
          bird === 'stork'
            ? 0.5 + Math.random()
            : bird === 'flamingo'
            ? 0.25 + Math.random()
            : 1 + Math.random() - 0.5

        return {
          key: index,
          position: [x, y, z],
          rotation: [0, x > 0 ? Math.PI : 0, 0],
          speed,
          factor,
          url: `/glb/${bird}.glb`,
        }
      }),
    []
  )

  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <Loader />
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <OrbitControls />
      <Suspense fallback={null}>
        {birds.map((props) => (
          <Bird {...props} key={props.key} />
        ))}
      </Suspense>
      <Preload />
    </Canvas>
  )
}



function Image(props) {
  const ref = useRef();
  const group = useRef();
  const data = useScroll();
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta);
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props}>
      <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
      <Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
      <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
    </group>
  );
}

function Pages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Page position={[-width * 1, 0, 0]} urls={["./img/1.jpg", "./img/2.jpg", "./img/3.jpg"]} />
     
    </>
  );
}