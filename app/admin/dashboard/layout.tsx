import Navigation from "@/app/components/admin/Navigation";

const layout = ({children}:any) => {

    return (
      <div className="flex ">
         <Navigation/>
      
         <div className="main p-5 w-full">

         {children}
         </div>
        
      </div>
    );
  };
  
  export default layout;
  