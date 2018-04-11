var foxmosa_js = {
  fox: {
    run: "foxmosa-iwy-run",
    find: "foxmosa-iwy-find"
  },

  init: () => {
    var me = foxmosa_js;
    me.createRunningFox();
    me.appearWhenFind();
  },

  appear: id => {
    var me = foxmosa_js;

    if (document.querySelector('#' + me.fox[id])) return;

    var img = document.createElement("IMG");
    img.classList.add('foxmosa-iwy');

    switch(id) {
      case 'run':
        img.src = browser.extension.getURL('./run.gif');
        break;
      case 'find':
        img.src = browser.extension.getURL('./find.png');
        break;
    }

    img.id = me.fox[id];
    return img;
  },

  createRunningFox: () => {
    var me = foxmosa_js;
    var $fox_run = me.appear('run');

    if (!$fox_run) return;
    document.body.append($fox_run);

    setTimeout( () => {
      $fox_run.style.right = '-192px';
    }, 1000)
  },

  appearWhenFind: () => {
    var me = foxmosa_js;
    document.addEventListener('keydown', e => {
      // ctrl/command + f/g
      if ((e.keyCode == 70 || e.keyCode == 71) && (e.ctrlKey || e.metaKey)) {

        var $fox_find = me.appear('find');

        if (!$fox_find) return;
        document.body.append($fox_find);

        $fox_find.addEventListener('click', () => {

          $fox_find.style.bottom = '-500px';
          setTimeout(() => {
            $fox_find.remove();
          }, 1000);
        });
      }
    })
  }
};

foxmosa_js.init();
