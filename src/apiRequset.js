const apiRequest = async (url="", optionObj = null, errMsg = null) =>{
    try {

        const respone = await fetch(url, optionObj) 
        if(!respone.ok)  throw Error ("Please reload the app")  //It may not be in sync with the database yet!!

        
    } catch (error) {
        errMsg = error.message;
    } finally{
        return errMsg
    }
}

export default apiRequest;