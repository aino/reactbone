require.config({
  baseUrl: '.',
  paths: {
    jquery: 'lib/jquery/jquery-1.10.2',
    underscore: 'lib/underscore/underscore',
    backbone: 'lib/backbone/backbone',
    store: 'lib/backbone/backbone.localStorage',
    react: 'lib/react/react',
    jsx: "lib/react/jsx",
    JSXTransformer: 'lib/react/JSXTransformer',
    aino: 'lib/aino/aino'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    aino: {
      deps: ['jquery']
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    store: {
      deps: ["backbone"],
      exports: 'Store'
    },
    JSXTransformer: {
      exports: "JSXTransformer"
    },
    react: {
      deps: ["JSXTransformer","jsx"]
    }
  }
});
require(['jquery','aino','underscore','backbone','store','react','JSXTransformer','jsx','app']);