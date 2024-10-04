import Page from '@/app/components/Page'
import Login from '@/app/components/user/login/Login'
import React from 'react'

const page = () => {
  return (
    <Page className="flex justify-center items-center ">
      <Login/>
    </Page>
  )
}

export default page