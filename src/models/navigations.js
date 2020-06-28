const { USER_TYPE } = require('../models/user_type.enum');
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


  var nav_root = [{
      "name": "CORE",
      "menu": []
  }];

  var base_nav = [{
    "name": "Home",
    "active": false,
    "collapsed": true,
    "route": "/home",
    "access_level": USER_TYPE.DESIGNER,
    "icon": "home",
    "matIcon": "",
    "faIcon": "",
    "style": {
      "height": "0px",
      "padding-top": "0px"
    },
    "subMenu": []
  }, 
  {
    "name": "Dashboard",
    "active": false,
    "collapsed": true,
    "route": "/dashboard",
    "access_level": USER_TYPE.DESIGNER,
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
    "access_level": USER_TYPE.DESIGNER,
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
        "access_level": USER_TYPE.DESIGNER,
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
        "access_level": USER_TYPE.DESIGNER,
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
    "access_level": USER_TYPE.VISITOR,
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
        "access_level": USER_TYPE.VISITOR,
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
        "access_level": USER_TYPE.VISITOR,
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
        "access_level": USER_TYPE.VISITOR,
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
    "access_level": USER_TYPE.DESIGNER,
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
        "access_level": USER_TYPE.DESIGNER,
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
        "access_level": USER_TYPE.REVIEWER,
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
  }];
  var admin = [
    {
      "name": "Admin",
      "active": false,
      "collapsed": true,
      "route": "/admin",
      "access_level": USER_TYPE.REVIEWER,
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
          "access_level": USER_TYPE.REVIEWER,
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
          "access_level": USER_TYPE.ADMIN,
          "icon": "user-plus",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "All Users",
          "active": false,
          "collapsed": true,
          "route": "/admin/users/all",
          "access_level": USER_TYPE.REVIEWER,
          "icon": "user-plus",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Submitted Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/submitted",
          "access_level": USER_TYPE.REVIEWER,
          "icon": "key",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Approved Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/approved",
          "access_level": USER_TYPE.REVIEWER,
          "icon": "key",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Rejected Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/rejected",
          "access_level": USER_TYPE.REVIEWER,
          "icon": "key",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Current Reviewing Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/reviewing",
          "access_level": USER_TYPE.REVIEWER,
          "icon": "key",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        },{
          "name": "Create Poll",
          "active": false,
          "collapsed": true,
          "route": "/admin/new/poll",
          "access_level": USER_TYPE.ADMIN,
          "icon": "tool",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        },
        {
          "name": "All Submitted Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/all/submitted",
          "access_level": USER_TYPE.SUPER_ADMIN,
          "icon": "tool",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        },
        {
          "name": "All Approved Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/all/approved",
          "access_level": USER_TYPE.SUPER_ADMIN,
          "icon": "tool",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        },
        {
          "name": "All Reviewing Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/all/reviewing",
          "access_level": USER_TYPE.SUPER_ADMIN,
          "icon": "tool",
          "matIcon": "",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        },
        {
          "name": "All Rejected Designs",
          "active": false,
          "collapsed": true,
          "route": "/admin/all/rejected",
          "access_level": USER_TYPE.SUPER_ADMIN,
          "icon": "tool",
          "matIcon": "",
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
      "name": "IAM",
      "active": false,
      "collapsed": true,
      "route": "/iam",
      "access_level": USER_TYPE.ADMIN,
      "icon": "",
      "matIcon": "security",
      "faIcon": "",
      "style": {
        "height": "0px",
        "padding-top": "0px"
      },
      "subMenu": [
        {
          "name": "User",
          "active": false,
          "collapsed": true,
          "route": "/iam/user",
          "access_level": USER_TYPE.ADMIN,
          "icon": "",
          "matIcon": "person",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "New User",
          "active": false,
          "collapsed": true,
          "route": "/iam/user/new",
          "access_level": USER_TYPE.ADMIN,
          "icon": "",
          "matIcon": "person",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Active Users",
          "active": false,
          "collapsed": true,
          "route": "/iam/user/active",
          "access_level": USER_TYPE.ADMIN,
          "icon": "",
          "matIcon": "person",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Reports",
          "active": false,
          "collapsed": true,
          "route": "/iam/user/active",
          "access_level": USER_TYPE.ADMIN,
          "icon": "",
          "matIcon": "person",
          "faIcon": "",
          "badge": "",
          "style": {
            "height": "0px",
            "padding-top": "0px"
          },
        }, {
          "name": "Access",
          "active": false,
          "collapsed": true,
          "route": "/iam/access",
          "access_level": USER_TYPE.SUPER_ADMIN,
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

module.exports = {
  test_nav: testNav,
  nav_root: nav_root,
  base_nav: base_nav, 
  admin_nav: admin
}
