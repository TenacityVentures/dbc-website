"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

/** Wall-clock failsafe; the clip itself is ~10.0s. */
const MAX_DURATION = 13000
/** If the clip cannot start by this point, drop the intro and show the page. */
const START_DEADLINE = 2500
/** Must match the outro transition in globals.css. */
const FADE_MS = 750

/**
 * Full-screen brand intro.
 *
 * Plays on every full document load and never on client-side navigation —
 * this lives in the root layout, so it mounts once per page load and does not
 * remount between routes. Nothing is persisted, so a reload always replays it.
 *
 * The overlay ships in the server-rendered markup so the page never flashes
 * before it appears; when the intro must be skipped, a layout effect removes
 * it before the first paint.
 */
export function IntroReveal() {
  const [state, setState] = useState<"pending" | "playing" | "leaving" | "done">("pending")
  const videoRef = useRef<HTMLVideoElement>(null)
  const timers = useRef<number[]>([])
  /*
    Kept apart from `timers`: the playing effect tears down when state moves to
    "leaving", and its cleanup clears `timers`. If the outro timer lived there
    it would be cancelled the instant it was scheduled, stranding the overlay
    in "leaving" and leaving the scroll lock on.
  */
  const fadeTimer = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const dismiss = useCallback(
    (immediate = false) => {
      clearTimers()
      setState((current) => {
        if (current === "leaving" || current === "done") return current
        if (immediate) return "done"
        if (fadeTimer.current === null) {
          fadeTimer.current = window.setTimeout(() => setState("done"), FADE_MS)
        }
        return "leaving"
      })
    },
    [clearTimers],
  )

  // Decide before paint so a skipped intro is never visible.
  useLayoutEffect(() => {
    let reduced = false
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    } catch {
      reduced = false
    }
    setState(reduced ? "done" : "playing")
  }, [])

  useEffect(() => {
    if (state !== "playing") return

    const video = videoRef.current
    if (!video) return
    let started = false
    let releaseGestureHooks = () => {}

    const onPlaying = () => {
      started = true
      timers.current.push(window.setTimeout(() => dismiss(), MAX_DURATION))
    }
    const onEnded = () => dismiss()
    const onError = () => dismiss(true)

    /*
      Portrait screens letterbox the 16:9 clip. Rather than leave bars, sample
      the clip's own vignette (bright centre, grey corners) and continue it
      across the whole overlay, so the fill reads as part of the footage.
    */
    const paintBackdrop = () => {
      const root = document.documentElement
      try {
        // Aspect-preserving so the diagonal we walk is the true radial one.
        const W = 64
        const H = 36
        const canvas = document.createElement("canvas")
        canvas.width = W
        canvas.height = H
        const ctx = canvas.getContext("2d", { willReadFrequently: true })
        if (!ctx) return
        ctx.drawImage(video, 0, 0, W, H)
        const px = (x: number, y: number) => {
          const [r, g, b] = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data
          return `rgb(${r} ${g} ${b})`
        }
        // Walk centre -> corner and hand the measured curve straight to CSS.
        const cx = W / 2
        const cy = H / 2
        ;[0, 0.25, 0.5, 0.75, 1].forEach((t, i) => {
          root.style.setProperty(`--intro-s${i}`, px(cx - cx * t, cy - cy * t))
        })
      } catch {
        /* keep the fallback colours */
      }

      // Distance from centre to a video corner, at the scale it is displayed.
      const vw = video.videoWidth || 1280
      const vh = video.videoHeight || 720
      const fitted =
        window.matchMedia("(orientation: portrait) and (max-width: 900px)").matches
          ? Math.min(window.innerWidth / vw, window.innerHeight / vh)
          : Math.max(window.innerWidth / vw, window.innerHeight / vh)
      const radius = Math.hypot(vw / 2, vh / 2) * fitted
      root.style.setProperty("--intro-r", `${Math.round(radius)}px`)
    }

    const onLoadedData = () => paintBackdrop()
    window.addEventListener("resize", paintBackdrop)
    window.addEventListener("orientationchange", paintBackdrop)

    video.addEventListener("playing", onPlaying)
    video.addEventListener("ended", onEnded)
    video.addEventListener("error", onError)
    video.addEventListener("loadeddata", onLoadedData)

    /*
      Browsers refuse autoplay with sound until the visitor has interacted with
      the site. Try with audio; if that is blocked, start muted and switch the
      sound on at the first gesture rather than showing a control.
    */
    video.muted = false
    video.volume = 1
    video.play().catch(() => {
      video.muted = true
      void video.play().catch(() => dismiss(true))

      const enableSound = () => {
        video.muted = false
        video.volume = 1
        releaseGestureHooks()
      }
      const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart", "wheel"]
      events.forEach((e) => window.addEventListener(e, enableSound, { once: true, passive: true }))
      releaseGestureHooks = () => events.forEach((e) => window.removeEventListener(e, enableSound))
    })

    timers.current.push(
      window.setTimeout(() => {
        if (!started) dismiss(true)
      }, START_DEADLINE),
    )

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      video.removeEventListener("playing", onPlaying)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("error", onError)
      video.removeEventListener("loadeddata", onLoadedData)
      window.removeEventListener("resize", paintBackdrop)
      window.removeEventListener("orientationchange", paintBackdrop)
      window.removeEventListener("keydown", onKey)
      releaseGestureHooks()
      clearTimers()
    }
  }, [state, dismiss, clearTimers])

  // Release every timer when the component finally goes away.
  useEffect(
    () => () => {
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current)
    },
    [],
  )

  // Lock scrolling only while the overlay is up.
  useEffect(() => {
    const active = state === "playing" || state === "leaving"
    document.documentElement.classList.toggle("intro-active", active)
    return () => document.documentElement.classList.remove("intro-active")
  }, [state])

  if (state === "done") return null

  return (
    <div className={`intro-overlay ${state === "leaving" ? "intro-overlay--leaving" : ""}`} role="presentation">
      <video
        ref={videoRef}
        className="intro-video"
        src="/brand/logo-motion.mp4"
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      />

      <button type="button" className="intro-btn" onClick={() => dismiss()}>
        Skip
      </button>
    </div>
  )
}
