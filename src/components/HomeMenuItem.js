//za brisanje?

import React from 'react'
import { withRouter } from 'react-router-dom'


function HomeMenuItem({ name, imageUrl, history, match, linkUrl }) {
  // console.log(id);
  
  return (
    <div style={{
      backgroundImage: `url(${imageUrl})`
    }} className="menu-item" onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div className="content">
        <h1 className="title">{name}</h1>

      </div>
    </div>
  )
}
export default withRouter(HomeMenuItem);
