import React from 'react'
import Swal from 'sweetalert2'
import { detectMyLocation } from '../redux/user/user-actions'


export default function BtnGeoLocation(props) {

  let showModel = () => {
    let dispatch = props.dispatch
    Swal.fire({
      title: 'Detect your location',
      text: 'Please allowe us to detect your location in order to find the closest routes for you.',
      icon: 'question',
      iconHtml: '<i class="fas fa-map-marker-alt"></i>',
      confirmButtonText: 'Detect',
      cancelButtonText: 'No thanks',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      console.log('then posle swal');
      if (result.value === true) {
        dispatch(detectMyLocation());
      }
    })

  }


  return (
    <div className="distance"><span className="btn" onClick={showModel}>Calculate distance</span></div>
  )
}
