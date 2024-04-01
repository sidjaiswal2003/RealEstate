import { errorHandle } from "../middleware/errorHandling.js"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp=async(req,res ,next)=>{
    try {
        
        const {username ,email,password}=req.body
        const salt= await bcrypt.genSalt()
        const hashPass=await bcrypt.hash(password,salt)
        const newUser= new User({username,email,password:hashPass})
        
        await newUser.save()
        res.status(200).json('New user is created')
    } catch (error) {
      
       next(error)
    }

   
}
export const login =async (req,res,next)=>{
   try {
    const {email,password}=req.body
    const validUser=await User.findOne({email})
    
    if(!validUser){
        return next(errorHandle(404,'Invalid Credentials(User not found'))
    }
    const validPassword=bcrypt.compareSync(password,validUser.password)
    if(!validPassword){return next(errorHandle(404,'Invalid Password'))}
    const token=jwt.sign({id:validUser._id},process.env.KEY) //Authentication the user
    const {password:pass,...rest}=validUser._doc
    // res.cookie('access token',token,{httpOnly:true}).status(200).json(rest)
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: true, // Set to true if your application is served over HTTPS
        sameSite: 'None', // Adjust based on your requirements
      }).status(200).json(rest);
      
   // res.send({token})
   } catch (error) {
    next(error)
   }
}
export const Google=async(req,res,next)=>{
    try {
       
        const user=await User.findOne({email:req.body.email})
        if(user){
            const token=jwt.sign({id:user._id},process.env.KEY) //Authentication the user
            const {password:pass,...rest}=user._doc
            // res.cookie('access token',token,{httpOnly:true}).status(200).json(rest)
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true, // Set to true if your application is served over HTTPS
                sameSite: 'None', // Adjust based on your requirements
              }).status(200).json(rest)

        }else{
            const generatedPassword=Math.random().toString(36).slice(-8)
            const hashedPassword= await bcrypt.hash(generatedPassword,10)
            const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+ Math.random().toString(36).slice(-4) ,email:req.body.email,password:hashedPassword , avatar:req.body.img })
            await newUser.save()
            
            const token=jwt.sign({id:newUser._id},process.env.KEY) //Authentication the user
            const {password:pass,...rest}=newUser._doc
            // res.cookie('access token',token,{httpOnly:true}).status(200).json(rest)
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true, // Set to true if your application is served over HTTPS
                sameSite: 'None', // Adjust based on your requirements
              }).status(200).json(rest)
 

        }
        
    } catch (error) {
        next(error)
        
    }

}
