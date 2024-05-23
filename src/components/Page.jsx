

export function Page({children, style}) {
  return (<div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "2em",
      flexWrap: "wrap",
      ...style,
    }}
  >
    {children}
  </div>)
}