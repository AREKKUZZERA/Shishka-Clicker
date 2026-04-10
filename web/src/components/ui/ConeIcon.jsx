import coneImg from '../../assets/conev2.png'

export function ConeIcon({ className = '' }) {
  return (
    <img
      src={coneImg}
      alt="шишка"
      className={`cone-icon ${className}`.trim()}
      draggable={false}
    />
  )
}
