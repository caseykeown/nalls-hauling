(() => {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.site-menu-toggle');
    const drawer = document.querySelector('.site-drawer');
    if (!header) return;

    const setHeaderHeight = () => {
        const height = `${header.offsetHeight}px`;
        document.documentElement.style.setProperty('--site-header-height', height);
        document.documentElement.style.setProperty('--header-h', height);
    };

    const setOpen = (open) => {
        if (!toggle || !drawer) return;
        drawer.classList.toggle('is-open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        document.body.classList.toggle('site-nav-open', open);
    };

    setHeaderHeight();
    window.addEventListener('load', setHeaderHeight);
    window.addEventListener('resize', setHeaderHeight);
    if ('ResizeObserver' in window) new ResizeObserver(setHeaderHeight).observe(header);

    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    drawer.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1180) setOpen(false);
    });
})();
