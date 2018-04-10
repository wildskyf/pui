var foxmosa_js = {
  $foxmosa_run: null,
  fox: {
    run: "foxmosa-iwy-run",
    find: "foxmosa-iwy-find"
  },

  init: () => {
    var me = foxmosa_js;
    if (document.querySelector('#' + me.fox.run)) return;

    me.createRunningFox();
    me.run();
    me.appearWhenFind();
  },

  appear: id => {
    var me = foxmosa_js;
    var img = me.$foxmosa_run = document.createElement("IMG");
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
    document.body.append(me.appear('run'));
  },

  run: () => {
    var me = foxmosa_js;
    var { $foxmosa_run } = me;

    setTimeout( () => {
      $foxmosa_run.style.right = '-192px';
    }, 1000)
  },

  appearWhenFind: () => {
    var me = foxmosa_js;
    document.addEventListener('keydown', e => {
      // ctrl/command + c
      if (e.keyCode == 70 && (e.ctrlKey || e.metaKey)){

        var $fox_find = me.appear('find');
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
