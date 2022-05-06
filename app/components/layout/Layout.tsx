export const Layout = ({ classMain, children }: { classMain?: string, children?: JSX.Element }) => {
  return (
    <main className={`p-8 ${classMain || ''}`}>
      <div className="z-index-1">
        {children}
      </div>
      {['red', 'blue', 'green'].map(c => <div key={c} className={`blur-shape blur-shape-${c}`}></div>)}
    </main>
  )
}
