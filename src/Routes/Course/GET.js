import {courses} from "../../Data/index.js";


export default {
    path:"/course/:id",
    endpoints:[
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
