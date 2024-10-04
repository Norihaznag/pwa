import Page from '@/app/components/Page'
import Register from '@/app/components/user/register/Register'
import React from 'react'

const page = () => {
  return (
    <Page className="flex justify-center items-center  p-5 bg-[#F3F3F3]">
      <Register/>
    </Page>
  )
}

export default page