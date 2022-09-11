import Link from 'next/link'
import map from 'lodash/map';

interface Props {
    timeline: Array<Object>
}


interface Blog {
    id: string,
    title: string
}

export default function Timeline(props: Props){
    var {timeline}      = props;
    return(
        <div className="flex flex-col items-center mt-2">
            <h1 className="text-xl mb-4 font-semibold">Previous Blog Posts</h1>
            <ul className="">
                {
                    map(timeline, function(months, year){
                        let ret = [],
                            monthLi = map(months, function(blogs, month){
                                let monthRet = [],
                                    blogsEle = map(blogs, function(blog: Blog){
                                        let id = blog.id,
                                            title = blog.title,
                                            href = `/blog/${id}`;
                                        return <li className="pl-16 before:content-['•'] before:pr-2 py-2 text-blue-500"><Link href={href}>{title}</Link></li>
                                    })
                                monthRet.push(<li className="pl-8 py-1 text-gray-700">{month}</li>);
                                monthRet.push(blogsEle);
                                return monthRet;
                            })
                        ret.push(<li className="text-lg font-medium py-2">{year}</li>);
                        ret.push(monthLi);
                        return ret;
                    })
                }
            </ul>
            
        </div>
    )
}
