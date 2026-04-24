import coneImg from '../../assets/conev2.png'

function GameIcon({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`cone-icon ${className}`.trim()}
      draggable={false}
    />
  )
}

export function ConeIcon({ className }) {
  return <GameIcon src={coneImg} alt="шишка" className={className} />
}
