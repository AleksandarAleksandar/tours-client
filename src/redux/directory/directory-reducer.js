const INITIAL_STATE = {
  sections: [{
    id: 1,
    title: 'hiking',
    imageUrl: `../resources/images/menu-options/santorini.jpg`,
    linkUrl: 'category/hiking'
  },
  {
    id: 2,
    title: 'swimming',
    imageUrl: '../resources/images/menu-options/sicily.jpg',
    linkUrl: 'category/swimming'
  },
  {
    id: 3,
    title: 'running',
    imageUrl: '../resources/images/menu-options/malta.jpg',
    linkUrl: 'category/running'
  },
  {
    id: 4,
    title: 'biking',
    imageUrl: '../resources/images/menu-options/cyprus.jpg',
    linkUrl: 'category/biking'
  }
  ]
}


const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}
export default directoryReducer