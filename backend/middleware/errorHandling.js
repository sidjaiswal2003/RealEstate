

export const error=async(err,req,res,next)=>{
    const statuscode=err.statuscode || 500
    const message=err.message || 'Internal Server Error'
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })

}

export  const errorHandle=(statuscode,message)=>{
    const error=new Error()
    error.statuscode=statuscode
    error.message=message
    return error

}