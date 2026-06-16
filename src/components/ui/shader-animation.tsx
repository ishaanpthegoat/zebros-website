"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: {
      time: { type: string; value: number }
      resolution: { type: string; value: THREE.Vector2 }
    }
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader — recolored to the Zebros pink/magenta brand
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        // Map the three line sets onto brand colours:
        // #ff1f8f (pink), #ffb3d6 (soft pink), #8a2be2 (purple accent)
        vec3 pink = vec3(1.0, 0.12, 0.56);
        vec3 soft = vec3(1.0, 0.70, 0.84);
        vec3 deep = vec3(0.54, 0.17, 0.89);
        vec3 c = color.r * pink + color.g * soft + color.b * deep;

        gl_FragColor = vec4(c, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Cap pixel ratio at 1.0 — halves pixel count on Retina screens (4× fewer
    // pixels to shade per frame), the single biggest perf win for the shader.
    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setPixelRatio(1)

    container.appendChild(renderer.domElement)

    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Render at ~30fps (skip every other frame) — halves GPU render cost
    // while keeping the shader visually indistinguishable from 60fps.
    let skipFrame = false
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      skipFrame = !skipFrame
      if (skipFrame) {
        if (sceneRef.current) sceneRef.current.animationId = animationId
        return
      }
      uniforms.time.value += 0.1   // double step to maintain same apparent speed
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    animate()

    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    />
  )
}
