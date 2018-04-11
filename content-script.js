var foxmosa_js = {
  fox: {
    run: "foxmosa-iwy-run",
    find: "foxmosa-iwy-find"
  },

  init: () => {
    var me = foxmosa_js;
    me.randomly(me.createRunningFox, 30);
    me.appearWhenFind();
  },

  randomly: (func, percent) => {
    var ran = Math.floor((Math.random() * 100) + 1); // 1 ~ 100
    if (percent >= ran) return;
    func();
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
    var fox = {
      $body: me.appear('find'),
      remove_timeout_id: null,

      show: () => {
        fox.$body.style.bottom = 0;
        document.body.append(fox.$body);
        fox.$body.addEventListener('click', fox.leave);

        if (fox.remove_timeout_id) clearTimeout(fox.remove_timeout_id);
      },

      leave: () => {
        fox.$body.style.bottom = '-500px';

        fox.remove_timeout_id = setTimeout( () => {
          fox.$body.remove();
        }, 1000);
      }
    }

    document.addEventListener('keydown', e => {
      // ctrl/command + f/g
      if ((e.keyCode == 70 || e.keyCode == 71) && (e.ctrlKey || e.metaKey)) {
        fox.show();
      }

      if (e.keyCode == 27) {
        fox.leave();
      }
    })
  }
};

foxmosa_js.init();
