//// Language switcher: a single trigger showing the current language code,
//// expanding into a dropdown of the other options. Replaces the old fixed
//// two-button neumorphism toggle, which had no room to grow past 2
//// languages. To add a language later (e.g. Dutch), add ONE entry to
//// LANGUAGES below - the markup for every .langWrap instance on the page
//// (desktop header nav + the sticky mobile navbar) is generated from this
//// array, so nothing else needs to change structurally.
////
//// Must run BEFORE Multilang.js's <script> tag (see index.html) - Multilang
//// wires up its click handling by querying every <a> on the page once, at
//// load time, and these <a language="..."> options need to already exist
//// in the DOM for it to find them. ////

(function () {
  const LANGUAGES = [
    { attr: 'Polish', code: 'PL', label: 'Polski' },
    { attr: 'english', code: 'EN', label: 'English' },
    // { attr: 'dutch', code: 'NL', label: 'Nederlands' },
  ];
  const DEFAULT_INDEX = 0;

  function buildSwitcher() {
    const root = document.createElement('div');
    root.className = 'lang-switcher';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lang-switcher__trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const currentLabel = document.createElement('span');
    currentLabel.className = 'lang-switcher__current';
    currentLabel.textContent = LANGUAGES[DEFAULT_INDEX].code;

    const caret = document.createElement('i');
    caret.className = 'fas fa-chevron-down lang-switcher__caret';
    caret.setAttribute('aria-hidden', 'true');

    trigger.appendChild(currentLabel);
    trigger.appendChild(caret);

    const menu = document.createElement('ul');
    menu.className = 'lang-switcher__menu';
    menu.setAttribute('role', 'listbox');

    LANGUAGES.forEach(function (lang, i) {
      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');

      const a = document.createElement('a');
      a.setAttribute('language', lang.attr);
      a.setAttribute('role', 'option');
      a.setAttribute('data-code', lang.code);
      a.className = 'btn_language lang-switcher__option' + (i === DEFAULT_INDEX ? ' active' : '');
      a.textContent = lang.label;

      li.appendChild(a);
      menu.appendChild(li);
    });

    root.appendChild(trigger);
    root.appendChild(menu);

    function closeMenu() {
      root.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = root.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    menu.addEventListener('click', function (event) {
      const option = event.target.closest('.lang-switcher__option');
      if (!option) return;
      currentLabel.textContent = option.getAttribute('data-code');
      closeMenu();
    });

    root.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    return { root: root, close: closeMenu };
  }

  const instances = [];
  document.querySelectorAll('.langWrap').forEach(function (wrap) {
    const switcher = buildSwitcher();
    wrap.appendChild(switcher.root);
    instances.push(switcher);
  });

  // Close any open dropdown on outside click, or when another one opens.
  document.addEventListener('click', function () {
    instances.forEach(function (s) { s.close(); });
  });
})();
