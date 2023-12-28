import FileSystem from "node:fs";
import Path from "node:path";
import mimetypes from "./MimeTypes.json" assert {type:"json"};


export default {
    path:"/static/:filename",
    endpoints:[{
        method:"GET",
        handler:(request,response)=>{
            const {filename}=request.params;
            const extension=Path.extname(filename);
            FileSystem.readFile(statics.folderPath+filename,(error,data)=>{
                if(error){
                    response.send(error);
                }
                else{
                    response.header("Content-Type",mimetypes[extension]);
                    response.send(data,"utf-8");
                }
            });
        },
    }],
}

const statics={
    folderPath:"src/Data/Files/",
}
