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
        "matIcon": "",
        "faIcon": "",
        "style": {
          "height": "0px",
          "padding-top": "0px"
        },
        "subMenu": []
      }, 
      {
        "name": "Design",
        "active": false,
        "collapsed": true,
        "route": "/design",
        "icon": "image",
        "matIcon": "",
        "faIcon": "",
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
            "matIcon": "",
            "faIcon": "",
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
            "icon": "",
            "matIcon": "photo_library",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          }
        ]
      }, 
      {
        "name": "Profile",
        "active": false,
        "collapsed": true,
        "route": "/profile",
        "icon": "user",
        "matIcon": "",
        "faIcon": "",
        "style": {
          "height": "0px",
          "padding-top": "0px"
        },
        "subMenu": [
          {
            "name": "General",
            "active": false,
            "collapsed": true,
            "route": "/profile/basic",
            "icon": "settings",
            "matIcon": "",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          }, {
            "name": "Change Password",
            "active": false,
            "collapsed": true,
            "route": "/profile/password",
            "icon": "key",
            "matIcon": "",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          },
          {
            "name": "Advanced",
            "active": false,
            "collapsed": true,
            "route": "/profile/advance",
            "icon": "tool",
            "matIcon": "",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          },
        ]
      },
      {
        "name": "Admin",
        "active": false,
        "collapsed": true,
        "route": "/admin",
        "icon": "",
        "matIcon": "security",
        "faIcon": "",
        "style": {
          "height": "0px",
          "padding-top": "0px"
        },
        "subMenu": [
          {
            "name": "Dashboard",
            "active": false,
            "collapsed": true,
            "route": "/admin",
            "icon": "",
            "matIcon": "dashboard",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          }, {
            "name": "Add Admin",
            "active": false,
            "collapsed": true,
            "route": "/admin/new/admin",
            "icon": "user-plus",
            "matIcon": "",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          }, {
            "name": "Verify Designs",
            "active": false,
            "collapsed": true,
            "route": "/admin/review",
            "icon": "key",
            "matIcon": "",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          },
          {
            "name": "Create Poll",
            "active": false,
            "collapsed": true,
            "route": "/admin/new/poll",
            "icon": "tool",
            "matIcon": "",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          },
        ]
      },
      {
        "name": "Activity",
        "active": false,
        "collapsed": true,
        "route": "/activity",
        "icon": "",
        "matIcon": "security",
        "faIcon": "",
        "style": {
          "height": "0px",
          "padding-top": "0px"
        },
        "subMenu": [
          {
            "name": "Mine",
            "active": false,
            "collapsed": true,
            "route": "/activity/mine",
            "icon": "",
            "matIcon": "person",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          }, {
            "name": "All",
            "active": false,
            "collapsed": true,
            "route": "/activity/all",
            "icon": "",
            "matIcon": "group",
            "faIcon": "",
            "badge": "",
            "style": {
              "height": "0px",
              "padding-top": "0px"
            },
          }
        ]
      }
      ]
    }];


module.exports = {
  test_nav: testNav,
  base_nav: baseNav
}
