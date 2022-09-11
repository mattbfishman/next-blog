import get from 'lodash/get';
import map from 'lodash/map';
import {parseImages} from '../shared/parseImages';
import {parseTimeline} from '../shared/parseTimeline';

type Data = {
    blog: Object
    timeline: Array<Object>
};

type Blog = {
    attributes: Object,
    id        : String
}

type Author = {
    name: String
}

type AuthorData = {
    data: Object
}

type BlogRet = {
    author     : Author[],
    body       : String,
    id         : String,
    description: String,
    subheader  : String,
    publishedAt: Date,
    title      : String
    timeline   : Array<Object>
}


function parseAuthors(_authors: AuthorData){
    var  authors    = _authors || {},
    data: any       = authors.data,
         authorsRet = map(data, function(authorObj: any){
            let author: Author = get(authorObj, 'attributes.name', '');
            return author;
        });

        return authorsRet;
}


class Parser {
    parse(_data: Data){
        var            data            = _data || {},
        blog           : any           = data.blog,
        timeline       : any           = data.timeline || [],
        blogData       : Blog          = blog.data,
                      id              = blogData.id,
        attributes     : any           = blogData.attributes,
                      authors         = attributes.authors,
        description    : String        = attributes.description,
        subheader      : String        = attributes.subheader,
        publishedAt    : Date          = attributes.publishedAt,
        title          : String        = attributes.title,
                      parsedAuthors   = parseAuthors(authors),
                      body            = attributes.body,
        parsedBody     : String        = parseImages(body),
        parsedTimeline : Array<Object> = parseTimeline(timeline),
        blogRet        : BlogRet       = {
            author: parsedAuthors,
            body  : parsedBody,
            timeline : parsedTimeline,
            id,
            description,
            subheader,
            publishedAt,
            title
        };

        return blogRet;
    }
}

export default Parser;