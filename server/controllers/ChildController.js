module.exports={
    addPoints:async (req,res)=>{
        const db=req.app.get("db");
        const {points, childId}=req.body;

        const updatedPoints= await db.children.add_points(points, childId)
        res.sendStatus(200)
    },
    spendPoints: async (req,res)=>{
        const db=req.app.get("db");
    }
}
