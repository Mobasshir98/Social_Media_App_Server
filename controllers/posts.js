const  mongoose = require('mongoose');
const postMessage=require('../models/postMessage')

const getposts= async (req,res)=>{
    try{
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

const createPost= async (req,res)=>{
    const post = req.body;
    const newpost= new postMessage(post);
    try{
        await newpost.save();

        res.status(201).json(newpost)
    }
    catch(err){
        res.status(409).json({message:err.message})
    }
}
const updatePost = async (req,res)=>{
    const {id:_id}=req.params;
    const post = req.body
    try{
        const postupdate=await postMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
        res.json(postupdate)
    }
    catch(err){
        console.log(err)
    }
}
const deletePost = async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await postMessage.findByIdAndRemove(id)
    res.json({message:"Post Deleted Successfully"})
}
const likePost =  async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post = await postMessage.findById(id);
    const updatedPost=await postMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1}, {new:true})
    res.json(updatedPost)
}

exports.likePost=likePost
exports.deletePost=deletePost 
exports.createPost=createPost
exports.getposts=getposts;
exports.updatePost=updatePost