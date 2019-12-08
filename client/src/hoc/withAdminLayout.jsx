import React from 'react'
//
import AdminHeader from '../components/AdminHeader'


export default function withAdminLayout(Content) {
  return (
    <div>
      <AdminHeader />
      <Content />
    </div>
  )
}
