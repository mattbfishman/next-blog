import map from 'lodash/map';
import get from 'lodash/get';
import {IMG_PATH} from '../../constants/index';
const DEFAULT = 'default';
const AUTHOR_PATH = 'data[0].attributes.name';
const THUMBNAIL_PATH = 'data.attributes.url';

interface Data {
    blogs: BlogData
};

interface BlogData {
    data: Array<Blog>
}

interface Blog {
    id: string,
    attributes : BlogAttributes
}

interface BlogAttributes {
    authors : String
    description: string
    type? : string
    subheader: string,
    title: string
    thumbnail: string
}


class Parser {
    parse(_data: Data){
        var data           = _data || {},
            blogs:BlogData = data.blogs,
            blogData       = blogs.data,
            retBlogs = map(blogData, function(_blog){
                let blog:Blog               = _blog || {},
                    blogAttr:BlogAttributes = blog.attributes || {},
                        id                  = blog.id,
                        authors             = blogAttr.authors || {},
                        authorName          = get(authors, AUTHOR_PATH, ''),
                        thumbnail           = blogAttr.thumbnail || {},
                        thumbnailUrl        = get(thumbnail, THUMBNAIL_PATH, ''),
                        description         = blogAttr.description,
                        title               = blogAttr.title,
                        type                = blogAttr.type || DEFAULT,
                        subheader           = blogAttr.subheader;
                return {
                    authors: authorName,
                    description,
                    title,
                    type,
                    subheader,
                    id,
                    thumbnail: `${IMG_PATH.local}${thumbnailUrl}`

                };
            });

        return retBlogs;
    }
}

export default Parser;