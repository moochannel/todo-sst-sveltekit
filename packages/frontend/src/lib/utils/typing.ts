export const forceString = (variable: unknown): string => {
  if (typeof variable === 'object') {
    return JSON.stringify(variable)
  }
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return String(variable)
}

export const exhaustive = (variable: never) => {
  throw new Error(`unreachable: ${forceString(variable)}`)
}
