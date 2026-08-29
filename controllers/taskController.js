import Task from '../models/Task.js'

export const createTask = async(req,res) => {
    try {
     const usertask = await  Task.create({...req.body,user:req.userId})
      return res.status(201).json({message:"task created successfully",usertask})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getTasks = async(req,res) => {
    try {
        const {search} = req.query
        let query = {user: req.userId}
        if(search){
            query.title = {$regex:search,$options:"i"}
        }
        const tasks = await Task.find(query)
        return res.status(201).json(tasks)
    } catch (error) {
          return res.status(500).json({message:error.message})
    }
}


export const updateTask = async(req,res) => {
    try {
      const usertask =  await Task.findOneAndUpdate({_id:req.params.id,user:req.userId},req.body,{new:true,runValidators:true})
        return res.status(201).json({message:"updated successfully",usertask})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteTask = async(req,res) => {
    try {
        await Task.findOneAndDelete({_id:req.params.id,user:req.userId})
          return res.status(201).json({message:"deleted successfully"})
    } catch (error) {
         return res.status(500).json({message:error.message})
    }
}
