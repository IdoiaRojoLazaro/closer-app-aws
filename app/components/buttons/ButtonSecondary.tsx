export const ButtonSecondary = ({ text, handleClick }: { text: string, handleClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className="btn-secondary" onClick={handleClick}>{text}</button>
  )
}
