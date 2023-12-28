import {courses} from "../Data/index.js";


export default {
    path:"/courses",
    endpoints:[{
        method:"GET",
        handler:(_,response)=>{
            response.send(courses);
        },
    }],
}
