export const ListSection = ({ title, children }: { title: string, children?: JSX.Element }) => {
  return (
    <>
      <h2 className="title-h2">{title}</h2>
      <ul className="flex flex-col gap-2 section">
        {children}
      </ul>
    </>
  )
}
