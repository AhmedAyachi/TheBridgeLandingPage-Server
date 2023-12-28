import {courses} from "../../Data/index.js";


export default {
    path:"/course",
    endpoints:[
        {
            method:"POST",
            handler:(request,response)=>{
                const {body}=request,{name,price}=body;
                if((typeof(name)==="string")&&(typeof(price)==="number")&&name&&(price>0)){
                    const course={
                        name,price,
                        id:Math.random().toString(36).slice(2),
                        poster:courses[Math.floor(Math.random()*courses.length)].poster,//just a random poster,
                    };
                    courses.unshift(course);
                    response.send({course});
                }
                else{
                    response.send({
                        error:"invalid course data",
                    });
                }
            },
        },
        {
            method:"DELETE",
            handler:(request,response)=>{
                const {body}=request,{id}=body;
                const course=courses.find(course=>course.id===id);
                if(course){
                    const index=courses.indexOf(course);
                    courses.splice(index,1);
                    response.send({deleted:true});
                }
                else{
                    response.status(404).send({error:"no course with such id"});
                }
            }
        },
        {
            method:"PUT",
            handler:(request,response)=>{
                const {body}=request,{id}=body;
                const course=courses.find(course=>course.id===id);
                if(course){
                    const {name,price}=body;
                    if(typeof(name)==="string"){
                        course.name=name;
                    }
                    if(typeof(price)==="number"&&(price>0)){
                        course.price=price;
                    }
                    response.send({updated:true,course});
                }
                else{
                    response.status(404).send({updated:false,error:"no course with such id"});
                }
            },
        },
        {
            method:"GET",
            handler:(request,response)=>{
                const {id}=request.params;
                const course=courses.find(course=>course.id===id);
                if(course){
                    response.send({course});
                }
                else{
                    response.status(404).send({error:"no course with such id"});
                }
            },
        },
    ],
}
