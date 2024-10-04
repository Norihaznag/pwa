"use client";

const Page = ({ children , className }: any) => {

  return <main className={` min-h-screen ${className}`}>
    {children}
    </main>;
};

export default Page;
