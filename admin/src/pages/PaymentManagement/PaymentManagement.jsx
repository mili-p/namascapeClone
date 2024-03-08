import React from 'react'
import { home } from '../../config/routeConsts';
import SiteBreadcrumb from '../../components/SiteBreadcrumb/SiteBreadcrumb';
import PaymentManagementTable from './PaymentManagementTable';
import requestApi from '../../common/request';


const PaymentManagement = () => {

  const downloadEvents = async() => {
    try{
        const response = await requestApi.post('/payment-management/export-data')
  
     const fileURL = response.data.url;
       if(fileURL){
           const link = document.createElement('a');
           link.href = fileURL;
           link.setAttribute('download', 'filename.ext'); 
           document.body.appendChild(link);
           
           link.click();
           
           document.body.removeChild(link);
       }else{
           console.log("no data available")
       }
  
    }catch(error){
          throw new Error(error.message)
    }
  }

  const BreadcrumbData = [
    {
        title: "Home",
        url: home,
    },
    {
        title: "Payment Management",
    }
  ];
  return (
    <>
      <div className='payment-management'>
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className='protected-head'>
            <h2>Payment Management</h2>
            <div className="flex items-center download-link" onClick={()=>downloadEvents()}><i className="icon-download"></i>Download Data</div>
        </div>
        <div className='mt-32'>
          <PaymentManagementTable />
        </div>
      </div>
    </>
  )
}

export default PaymentManagement