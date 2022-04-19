export const ConditionalWrapper = ({
  condition,
  Wrapper,
  children,
  ...wrapperProps
}: {
  condition: boolean
  Wrapper: (...args: any[]) => JSX.Element
  children: React.ReactNode
  [wrapperProps: string]: any
}) =>
  condition ? <Wrapper {...wrapperProps}>{children}</Wrapper> : <>{children}</>
