var testNav = [
    {
      "name": "CORE",
      "menu": [
        {
          "name": "Dashboard",
          "active": false,
          "collapsed": true,
          "style": {
            "height": "0px"
          },
          "subMenu": [
            {
              "name": "Default",
              "collapsed": true,
              "active": false,
              "badge": null
            },
            {
              "name": "Multipurpose",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            },
            {
              "name": "Affiliate",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            }
          ]
        }
      ]
    },
    {
      "name": "INTERFACE",
      "menu": [
        {
          "name": "Layout",
          "active": true,
          "collapsed": false,
          "style": {},
          "subMenu": [
            {
              "name": "Static Nav",
              "collapsed": true,
              "active": false,
              "badge": null
            },
            {
              "name": "Dark Side",
              "collapsed": false,
              "active": true,
              "badge": "New!"
            },
            {
              "name": "RTL Layout",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            },
            {
              "name": "Page Header",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            }
          ]
        },
        {
          "name": "Components",
          "active": false,
          "collapsed": true,
          "style": {
            "height": "0px"
          },
          "subMenu": [
            {
              "name": "Alarts",
              "collapsed": true,
              "active": false,
              "badge": null
            },
            {
              "name": "Avaters",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            },
            {
              "name": "Badges",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            }
          ]
        },
        {
          "name": "Utilities",
          "active": false,
          "collapsed": true,
          "style": {
            "height": "0px"
          },
          "subMenu": [
            {
              "name": "Static Nav",
              "collapsed": true,
              "active": false,
              "badge": null
            },
            {
              "name": "Dark Side",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            },
            {
              "name": "Page Header",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            }
          ]
        },
        {
          "name": "Pages",
          "active": false,
          "collapsed": true,
          "style": {
            "height": "0px"
          },
          "subMenu": [
            {
              "name": "Static Nav",
              "collapsed": true,
              "active": false,
              "badge": null
            },
            {
              "name": "Dark Side",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            },
            {
              "name": "Page Header",
              "collapsed": true,
              "active": false,
              "badge": "New!"
            }
          ]
        }
      ]
    }
  ];

  
  var baseNav = [{
      "name": "CORE",
      "menu": [{
          "name": "Dashboard",
          "active": false,
          "collapsed": true,
          "route": "/dashboard",
          "icon": "monitor",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
          "subMenu": []
        }, {
            "name": "Design",
            "active": false,
            "collapsed": true,
            "route": "/design",
            "icon": "figma",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
            "subMenu": [
              {
                "name": "Create",
                "active": false,
                "collapsed": true,
                "route": "/design/new",
                "icon": "plus",
                "badge": "",
                "style": {
                  "height": "0px",
                  "padding-top": "0px"
                },
              },
              {
                "name": "My Designs",
                "active": false,
                "collapsed": true,
                "route": "/design/list",
                "icon": "image",
                "badge": "",
                "style": {
                  "height": "0px",
                  "padding-top": "0px"
                },
              }
            ]
        } /*, {
        "name": "Show design",
        "active": false,
        "collapsed": true,
        "route": "/design/list",
        "icon": "image",
        "style": {
          "height": "0px",
          "padding-top": "0px"
        },
        "subMenu": []
      } */
      ]
    }];


module.exports = {
  test_nav: testNav,
  base_nav: baseNav
}
