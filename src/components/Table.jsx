import React from 'react'
import fetchUsers from '../service/userService'
import './styles.css'
function Table() {
    const [response,setResponse]=React.useState([])
    const [initialData,setInitialData]=React.useState([])
    const [searchQuery,setSearchQuery]=React.useState()
    const [debounceQuery,setDebouncedQuery]=React.useState()
    const fetchData=async()=>{
        try{
            const res= await fetch(`https://dummyjson.com/users`)
            const result=await res.json();
            console.log(result?.users,'result')
            console.log(res.json(),'resres')
            setInitialData(result?.users)
            setResponse(result?.users)
        }
        catch(e){
            console.log(e,'e')
        }
    }
    // React.useEffect(()=>{
    //     const returnhandler=setTimeout(()=>{
    //         setDebouncedQuery(searchQuery)
    //         handleSearch()
    //     },300)
    //     return ()=> clearTimeout(returnhandler)
    // },[searchQuery])

    
    React.useEffect(()=>{
        fetchData()
    },[])
    const handleSearch=async()=>{
       if(searchQuery){
            const filteredData=initialData?.filter((data)=>{
               
                return `${data?.firstName} ${data?.lastName} ${data?.email} ${data?.company?.name}`.toLowerCase().includes(searchQuery?.toLowerCase())
            })
            console.log(filteredData,'filteredData')
            setResponse(filteredData)
        }else{
            setResponse(initialData)
        }
            
       
    }
    console.log(response,'response')
    console.log(response?.length,'response?.length')
  return (
    <>
    <input placeholder="Search wither by FullName, Email,Company Name"
    style={{width:"400px"}}
    onChange={(e)=>setSearchQuery(e.target.value)} />
    <button style={{marginLeft:"30px"}} onClick={handleSearch}>Search</button>
    {/* {response?.length==0? */}
    <table>
    <tr>
      <th>Full Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Company Name</th>
      <th>Addres(City,Street)</th>

    </tr>
    {response?.map((data,index)=>{
        return <tbody>

        <tr>
        <td>{data?.firstName+ ' '+ data?.lastName}</td>
        <td>{data?.email}</td>
        <td>{data?.phone}</td>
        <td>{data?.company?.name}</td>
        <td>{data?.address?.address+','+','+data?.address?.city}</td>
      </tr>
      </tbody>
    })}
  </table> 
  {/* :<h1>No data found</h1>} */}
  </>
  )
}

export default Table