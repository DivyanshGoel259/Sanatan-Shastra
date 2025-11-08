"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

export default function MahadevScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0e27)
    scene.fog = new THREE.Fog(0x0a0e27, 100, 500)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    // Create Mahadev's divine aura (animated spheres and particles)
    const mainOrb = new THREE.IcosahedronGeometry(2, 32)
    const orbMaterial = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      emissive: 0x5b21b6,
      emissiveIntensity: 0.6,
      wireframe: false,
    })
    const orbMesh = new THREE.Mesh(mainOrb, orbMaterial)
    scene.add(orbMesh)

    // Inner glowing sphere
    const innerGeometry = new THREE.IcosahedronGeometry(1.8, 24)
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
      wireframe: true,
    })
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)
    innerMesh.scale.set(1, 1, 1)
    scene.add(innerMesh)

    // Outer aura glow
    const auraGeometry = new THREE.IcosahedronGeometry(2.5, 16)
    const auraMaterial = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const auraMesh = new THREE.Mesh(auraGeometry, auraMaterial)
    scene.add(auraMesh)

    // Particle system for cosmic effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x06b6d4,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Lighting
    const pointLight = new THREE.PointLight(0x7c3aed, 2)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.5)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    setIsLoaded(true)

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", onMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Smooth rotation based on mouse
      orbMesh.rotation.x += 0.0005 + mouseY * 0.0001
      orbMesh.rotation.y += 0.0008 + mouseX * 0.0001

      innerMesh.rotation.x -= 0.0006
      innerMesh.rotation.y -= 0.0009

      auraMesh.rotation.x += 0.0003
      auraMesh.rotation.y += 0.0005

      // Pulse effect
      const pulse = Math.sin(Date.now() * 0.001) * 0.3 + 0.9
      orbMaterial.emissiveIntensity = 0.6 * pulse

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-cyan-900/20">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-2xl text-purple-300"
          >
            ॐ
          </motion.div>
        </div>
      )}
    </div>
  )
}
