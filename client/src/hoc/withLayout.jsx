import React from 'react'
//
import Header from '../components/Header'


export default function withLayout(Content) {
  return (
    <div>
      <Header />
      <Content />
    </div>
  )
}
