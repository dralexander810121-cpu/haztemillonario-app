export default function Ball({ n, variant = 'gold', size = 'md' }) {
  const cls = [
    'ball',
    size === 'sm' ? 'ball-sm' : size === 'xs' ? 'ball-xs' : size === 'lg' ? 'ball-lg' : '',
    variant === 'red' ? 'ball-red' : variant === 'green' ? 'ball-green' : '',
  ].join(' ');
  return <span className={cls}>{String(n).padStart(2, '0')}</span>;
}
