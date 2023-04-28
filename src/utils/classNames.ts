export default function joinClassNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(' ');
}
