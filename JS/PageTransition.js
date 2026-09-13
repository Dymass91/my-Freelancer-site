//// Simple fade transition between subpages (not the homepage, which
//// keeps its own existing loader/hero animation untouched - this
//// script is only included on /realizacje/, case studies, and the
//// service pages). Intercepts same-origin link clicks, fades the
//// current page out, then navigates - so moving between subpages (or
//// back to the homepage) doesn't feel like an abrupt hard cut. ////

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      return;
    }
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add('page-transition-out');
    setTimeout(function () {
      window.location.href = url.href;
    }, 180);
  });
});
