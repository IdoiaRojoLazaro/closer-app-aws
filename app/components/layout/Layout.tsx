export const Layout = ({ classMain, children }: { classMain?: string, children?: JSX.Element }) => {
  return (
    <main className={`p-8 ${classMain || ''}`}>
      <div className="z-index-1">
        {children}
      </div>
      <div className="blur-shape blur-shape-red"></div>
      <div className="blur-shape blur-shape-blue"></div>
      <div className="blur-shape blur-shape-green"></div>
    </main>
  )
}
