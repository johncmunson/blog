export const ConditionalWrapper = ({
  condition,
  Wrapper,
  children,
  ...wrapperProps
}: {
  condition: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Wrapper: (...args: any[]) => JSX.Element
  children: React.ReactNode
  [wrapperProps: string]: any
}) =>
  condition ? <Wrapper {...wrapperProps}>{children}</Wrapper> : <>{children}</>
