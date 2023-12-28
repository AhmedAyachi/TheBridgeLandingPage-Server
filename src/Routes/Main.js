

export default {
    path:"/",
    endpoints:[{
        method:"GET",
        handler:(_,response)=>{
            response.send("Fastify Server Main Route");
        },
    }],
}
