// Visar riktig enhetsram i designläget och en vanlig helskärmsyta i appläget.
window.__isApp = /[?&]app\b/.test(location.search) || /github\.io$/.test(location.hostname);

function AppFrame({ kind, children, ...rest }) {
  const [, tick] = React.useState(0);
  const Dev = kind === 'android' ? window.AndroidDevice : window.IOSDevice;
  React.useEffect(() => {
    if (window.__isApp || Dev) return;
    const t = setInterval(() => tick(n => n + 1), 200);
    return () => clearInterval(t);
  }, [Dev]);
  if (!window.__isApp && Dev) return React.createElement(Dev, rest, children);
  return React.createElement('div', {
    style: { '--top': 'calc(env(safe-area-inset-top, 0px) + 22px)', flex: 1, height: '100%', minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }
  }, children);
}
window.AppFrame = AppFrame;
