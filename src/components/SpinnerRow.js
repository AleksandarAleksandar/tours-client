import React from 'react'
import Spinner from './Spinner'

export default function SpinnerRow() {
  return (
    <div className="spinner-row">
      <div className="spinner">
        <Spinner />
      </div>
    </div>
  )
}