const fs = require("fs")
const path = require("path")

const blacks = ['index']

global.required = async(dir)=>
{
    const file_or_folders = fs.readdirSync(dir)

    file_or_folders.forEach(element => {
        let base_name = path.basename(element,".js")
        if(blacks.includes(base_name) == false)
        {
            require(path.join(dir,base_name))
        }
    });
}