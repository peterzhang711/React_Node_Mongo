

import React from 'react'

import './logo.less'
import logo from './logo.JPG'


export default function Logo() {
  return (
    <div classname="logo-container">
      <img src={logo} alt='logo' classname="logo-img"/>
    </div>
  )
}