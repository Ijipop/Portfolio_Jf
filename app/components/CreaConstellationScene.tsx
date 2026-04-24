'use client'

/**
 * Constellations Three.js sans @react-three/fiber (évite ReactCurrentOwner / double React avec Next).
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export type CreaConstellationSceneProps = {
  bg: string
  primary: string
  secondary: string
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    return ((t ^ (t >>> 7)) >>> 0) / 4294967296
  }
}

function buildStars(rng: () => number, count: number) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (rng() - 0.5) * 22
    arr[i * 3 + 1] = (rng() - 0.5) * 14
    arr[i * 3 + 2] = (rng() - 0.5) * 1.6
  }
  return arr
}

function distSq(ax: number, ay: number, az: number, bx: number, by: number, bz: number) {
  const dx = ax - bx
  const dy = ay - by
  const dz = az - bz
  return dx * dx + dy * dy + dz * dz
}

function buildLinkVertices(positions: Float32Array, maxNeighbors: number, maxDistSq: number) {
  const n = positions.length / 3
  const verts: number[] = []
  const seen = new Set<string>()

  for (let i = 0; i < n; i++) {
    const ix = positions[i * 3]
    const iy = positions[i * 3 + 1]
    const iz = positions[i * 3 + 2]
    const cand: { j: number; d: number }[] = []
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const d = distSq(ix, iy, iz, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
      if (d < maxDistSq) cand.push({ j, d })
    }
    cand.sort((a, b) => a.d - b.d)
    for (let k = 0; k < Math.min(maxNeighbors, cand.length); k++) {
      const j = cand[k].j
      const a = Math.min(i, j)
      const b = Math.max(i, j)
      const key = `${a}-${b}`
      if (seen.has(key)) continue
      seen.add(key)
      verts.push(ix, iy, iz, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
    }
  }
  return new Float32Array(verts)
}

export default function CreaConstellationScene({ bg, primary, secondary }: CreaConstellationSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let rafId = 0
    let running = true
    let pointerX = 0
    let pointerY = 0

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(new THREE.Color(bg), 1)
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75))
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 48)
    camera.position.set(0, 0, 10)

    const group = new THREE.Group()
    scene.add(group)

    const rng = mulberry32(20260124)
    const starPositions = buildStars(rng, 96)
    const lineVerts = buildLinkVertices(starPositions, 3, 14)

    const pointsGeom = new THREE.BufferGeometry()
    pointsGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const pointsMat = new THREE.PointsMaterial({
      color: new THREE.Color(primary),
      size: 0.052,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const pointsObj = new THREE.Points(pointsGeom, pointsMat)
    group.add(pointsObj)

    const linesGeom = new THREE.BufferGeometry()
    linesGeom.setAttribute('position', new THREE.BufferAttribute(lineVerts, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(secondary),
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const linesObj = new THREE.LineSegments(linesGeom, lineMat)
    group.add(linesObj)

    const clockStart = performance.now()

    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointerX = ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1
      pointerY = -(((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1)
    }
    el.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const w = el.clientWidth
      const h = Math.max(1, el.clientHeight)
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const animate = () => {
      if (!running) return
      rafId = requestAnimationFrame(animate)
      const t = (performance.now() - clockStart) / 1000
      group.rotation.z = t * 0.016
      group.rotation.y = Math.sin(t * 0.055) * 0.045 + pointerX * 0.14
      group.rotation.x = pointerY * 0.09
      lineMat.opacity = 0.16 + Math.sin(t * 0.9) * 0.06
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      ro.disconnect()
      el.removeEventListener('pointermove', onPointerMove)
      pointsGeom.dispose()
      pointsMat.dispose()
      linesGeom.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [bg, primary, secondary])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        touchAction: 'none',
      }}
    />
  )
}
