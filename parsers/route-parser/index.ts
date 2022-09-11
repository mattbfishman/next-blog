type Data = {
    blogs: Object
};


type Params = {
    id: String

}



class Parser {
    parse(_data: Data){
        var  data     = _data || {},
        blog : any    = data.blogs,
             blogData = blog.data,
             ret      = [],
        index;

        for(index in blogData){
            var blogParam: Params = blogData[index],
            id  : String          = blogParam.id;

            ret.push({
                params: {
                    id: id
                }
            });
            
        }

        return ret;
    }
}

export default Parser;