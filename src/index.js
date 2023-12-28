import Fastify from "fastify";
import cors from "@fastify/cors";
import * as routes from "./Routes/index.js";


const server=Fastify({logger:false});
server.register(cors,{
    
});
Object.values(routes).forEach(route=>{
    const {path,endpoints}=route;
    endpoints?.forEach(endpoint=>{
        const {handler}=endpoint;
        const method=endpoint.method?.toLowerCase()||"get";
        if(Array.isArray(handler)){
            const {length}=handler;
            server[method](path,(request,response)=>{
                response.locals={};
                let i=-1;
                !function next(index){
                    i=index||i+1;
                    if(i<length){
                        handler[i]?.(request,response,next);
                    }
                }();
            });
        }
        else{server[method](path,handler)};
    });
});
/* server.post("",(_,response)=>{
    response.status().se
}) */
server.listen({port:8080},(error,address)=>{
    console.log(`Server running at ${address}`);
});
