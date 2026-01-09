"use client"

export default function Preloader({ done }: { done: boolean }) {
  return (
    <div className={`preloader ${done ? "preloader--done" : ""}`}>
      <div className="preloader-text">
        <span className="letter letter-r">R</span>
        <span className="letter letter-g">G</span>
      </div>
    </div>
  )
}
