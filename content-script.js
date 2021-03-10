const IS_DEV = false

var molcar_js = {
  car: {
    run: "molcar-iwy-run",
    find: "molcar-iwy-find"
  },

  init: () => {
    var me = molcar_js;
    me.randomly(me.createRunningcar, IS_DEV ? 100 : 30);
    me.appearWhenFind();
  },

  randomly: (func, percent) => {
    var ran = Math.floor((Math.random() * 100) + 1); // 1 ~ 100
    if (percent < ran) return;
    func();
  },

  appear: id => {
    var me = molcar_js;

    if (document.querySelector('#' + me.car[id])) return;

    var img = document.createElement("IMG");
    img.classList.add('molcar-iwy');
    img.classList.add('always-enable-animations'); // fix for facebook

    switch(id) {
      case 'run':
        img.src = chrome.runtime.getURL('./run.gif');
        break;
        // case 'find':
        //   img.src = browser.extension.getURL('./find.png');
        //   break;
    }

    img.id = me.car[id];
    return img;
  },

  createRunningcar: () => {
    var me = molcar_js;
    var $car_run = me.appear('run');

    if (!$car_run) return;
    document.body.append($car_run);

    setTimeout( () => {
      $car_run.style.right = '-192px';
    }, 1000)
  },

  appearWhenFind: () => {
    var me = molcar_js;
    var car = {
      $body: me.appear('find'),
      remove_timeout_id: null,

      show: () => {
        car.$body.style.bottom = 0;
        document.body.append(car.$body);
        car.$body.addEventListener('click', car.leave);

        if (car.remove_timeout_id) clearTimeout(car.remove_timeout_id);
      },

      leave: () => {
        car.$body.style.bottom = '-500px';

        car.remove_timeout_id = setTimeout( () => {
          car.$body.remove();
        }, 1000);
      }
    }

    document.addEventListener('keydown', e => {
      // ctrl/command + f/g
      if ((e.keyCode == 70 || e.keyCode == 71) && (e.ctrlKey || e.metaKey)) {
        car.show();
      }

      if (e.keyCode == 27) {
        car.leave();
      }
    })
  }
};

molcar_js.init();
