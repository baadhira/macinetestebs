const fetchUsers=()=>{
    try{
        const res= fetch(`https://dummyjson.com/users`)
    }
    catch(e){
        console.log(e,'e')
    }
}
export default {fetchUsers}