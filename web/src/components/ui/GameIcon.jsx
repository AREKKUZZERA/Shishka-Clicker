import coneImg from '../../assets/conev2.png'
import knowledgeImg from '../../assets/knowledge.png'
import moneyImg from '../../assets/money.png'
import powerImg from '../../assets/power.png'
import prizeImg from '../../assets/prize.png'
import robotImg from '../../assets/robot.png'

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

export function KnowledgeIcon({ className }) {
  return <GameIcon src={knowledgeImg} alt="знания" className={className} />
}

export function MoneyIcon({ className }) {
  return <GameIcon src={moneyImg} alt="деньги" className={className} />
}

export function PowerIcon({ className }) {
  return <GameIcon src={powerImg} alt="сила" className={className} />
}

export function PrizeIcon({ className }) {
  return <GameIcon src={prizeImg} alt="кубок" className={className} />
}

export function RobotIcon({ className }) {
  return <GameIcon src={robotImg} alt="AI" className={className} />
}
