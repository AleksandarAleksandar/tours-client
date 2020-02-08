

export const routesData = [
  {
    routeName: 'NOT_FOUND',
    browserTitle: 'Not Found',
    pageTitle: '',
    breadcrumbs: []
  },
  {
    routeName: 'HOME',
    path: '/',
    readme: 'www.ovajsajt.com/',
    browserTitle: 'Home',
    pageTitle: 'Home',
    breadcrumbs: ['HOME']
  },
  {
    routeName: 'CONTACT',
    path: '/contact',
    browserTitle: 'Contact us',
    pageTitle: 'Contact us',
    breadcrumbs: ['HOME', 'CONTACT']
  },
  {
    routeName: 'PROFILE',
    path: '/profile',
    browserTitle: 'User profile',
    pageTitle: 'User profile',
    breadcrumbs: ['HOME', 'PROFILE']
  },
  {
    routeName: 'SHOP',
    path: '/shop',
    browserTitle: 'Shop',
    pageTitle: 'Shop',
    breadcrumbs: ['HOME', 'SHOP']
  },
  {
    routeName: 'PRODUCT',
    browserTitle: 'Product',
    pageTitle: 'Product ...',
    breadcrumbs: ['HOME', 'SHOP', 'PRODUCT']
  },
  {
    routeName: 'REVIEW_CREATE',
    browserTitle: 'Write review',
    pageTitle: 'Write review',
    breadcrumbs: ['HOME', 'SHOP', 'REVIEW_CREATE']
  },
  {
    routeName: 'CATEGORY',
    browserTitle: 'Categoy',
    pageTitle: 'Category ...',
    breadcrumbs: ['HOME', 'SHOP', 'CATEGORY']
  },

  {
    routeName: 'CART',
    path: '/cart',
    browserTitle: 'Cart',
    pageTitle: 'Cart',
    breadcrumbs: ['HOME', 'SHOP', 'CART']
  },
  {
    routeName: 'CHECKOUT',
    path: '/checkout',
    browserTitle: 'Checkout',
    pageTitle: 'Checkout',
    breadcrumbs: ['HOME', 'SHOP', 'CART', 'CHECKOUT']
  },

  {
    routeName: 'AP_NOT_FOUND',
    browserTitle: 'Admin Panel Page Not Found',
    pageTitle: '',
    breadcrumbs: []
  },
  {
    routeName: 'AP',
    path: '/admin',
    readme: 'admin panel Welcome page',
    browserTitle: 'Admin Panel',
    pageTitle: 'Admin Panel',
    breadcrumbs: ['HOME', 'AP']
  },
  {
    routeName: 'AP_GUIDES_LIST',
    path: '/admin/guides',
    browserTitle: 'Guides List',
    pageTitle: `Guides List`,
    breadcrumbs: ['HOME', 'AP', 'AP_GUIDES_LIST']
  },
  {
    routeName: 'AP_GUIDES_ADD',
    path: '/admin/guides/add',
    browserTitle: 'Add Guide',
    pageTitle: 'Add Guide',
    breadcrumbs: ['HOME', 'AP', 'AP_GUIDES_LIST', 'AP_GUIDES_ADD']
  },
  {
    routeName: 'AP_GUIDES_EDIT',
    readme: 'verovatn oce biti path: /admin/guides/ID/edit',
    browserTitle: 'Edit Guide',
    pageTitle: 'Edit Guide',
    breadcrumbs: ['HOME', 'AP', 'AP_GUIDES_LIST', 'AP_GUIDES_EDIT']
  }
  ,
  {
    routeName: 'AP_TOURS_LIST',
    path: '/admin/tours/list',
    browserTitle: 'List Tours',
    pageTitle: 'List Tours',
    breadcrumbs: ['HOME', 'AP', 'AP_TOURS_LIST']
  },
  {
    routeName: 'AP_TOURS_ADD',
    path: '/admin/tours/add',
    browserTitle: 'Add Tour',
    pageTitle: 'Add Tour',
    breadcrumbs: ['HOME', 'AP', 'AP_TOURS_LIST', 'AP_TOURS_ADD']
  },
  {
    routeName: 'AP_TOURS_EDIT',
    browserTitle: 'Edit Tours',
    pageTitle: 'Edit Tours',
    breadcrumbs: ['HOME', 'AP', 'AP_TOURS_LIST', 'AP_TOURS_EDIT']
  }
]


// ucenje
let mocniji_breadcrumbs = [
  {
    option: 'HOME',
    submenu: [
      {
        option: 'GUIDES_LIST',
        submenu: [
          {
            option: 'GUIDES_ADD'
          },
          {
            option: 'GUIDES_EDIT'
          },
        ]
      },
      {
        option: 'TOURS_LIST',
        submenu: [
          {
            option: 'TOURS_ADD'
          },
          {
            option: 'TOURS_EDIT'
          },
        ]
      }

    ]
  }
];

let drugacije = [
  {
    option: 'HOME',
    parent: null
  },
  {
    option: 'GUIDES_LIST',
    parent: 'HOME'
  },
  {
    option: 'GUIDES_ADD',
    parent: 'GUIDES_LIST'
  },
  {
    option: 'GUIDES_EDIT',
    parent: 'GUIDES_LIST'
  }

];
