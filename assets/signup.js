/* Email signup forms (Kit). One form per list: "players" on the home page, "press" on the press page.
   Paste each Kit form's number below (Kit: Grow > Landing Pages & Forms > the form > Publish > HTML,
   the number in "app.kit.com/forms/NUMBER/subscriptions"). A block with no number stays hidden. */
(function () {
  var KIT_FORMS = {
    players: '',
    press: ''
  };

  document.querySelectorAll('[data-signup]').forEach(function (block) {
    var id = KIT_FORMS[block.getAttribute('data-signup')];
    if (!id) return;
    var form = block.querySelector('form');
    var msg = block.querySelector('.signup-msg');
    var button = form.querySelector('button');
    var url = 'https://app.kit.com/forms/' + id + '/subscriptions';
    form.action = url;
    block.hidden = false;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      button.disabled = true;
      msg.textContent = 'Signing you up...';
      fetch(url, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          msg.textContent = 'Almost done! Check your inbox and click the link to confirm.';
        })
        .catch(function () {
          /* if the quiet way fails, send the form the normal way in a new tab */
          form.target = '_blank';
          form.submit();
          msg.textContent = 'Opened the signup in a new tab.';
        })
        .finally(function () { button.disabled = false; });
    });
  });
})();
