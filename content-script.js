var foxmosa_js = {
  $foxmosa: null,
  fox: {
    run: "foxmosa-iwy-run"
  },

  init: () => {
    var me = foxmosa_js;
    if (document.querySelector('#' + me.fox.run)) return;

    me.appendToPage();
    me.run();
  },

  appendToPage: () => {
    var me = foxmosa_js;
    var img = me.$foxmosa = document.createElement("IMG");
    img.src = browser.extension.getURL('./run.gif');
    img.id = me.fox.run;

    document.body.append(img);
  },

  run: () => {
    var me = foxmosa_js;
    var doc_width = document.body.clientWidth;
    var $foxmosa = me.$foxmosa;

    $foxmosa.style.top = 'calc(100vh - 91.5px)';

    var left = 0;
    var interval_id = setInterval( () => {
      left += 6;
      $foxmosa.style.left = left + 'px';

      if (left > doc_width) {
      }
    }, 30);
  }
};

foxmosa_js.init();
