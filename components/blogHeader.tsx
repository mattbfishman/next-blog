import Image from 'next/image';
import test from '../public/test.jpg';
var moment = require('moment');

interface Props {
    author: String,
    publishedAt: Date,
    title: String,
    description: String
}

export default function BlogHeader(props: Props){
    var author  = props.author,
        caption = 'A beautiful picture',
        source  = 'John Doe', 
        imageCaption = caption && source ? `${caption} - ${source}` : false,
        publishedAt = props.publishedAt,
        description = props.description,
        title       = props.title,
        formattedDate = moment(publishedAt).format('MMM Do YYYY, h:mm A'); //move this to data intake later on to not rerender in frontend
    return(
        <div className='mb-8'>
            <h1 className="text-3xl tracking-widest">{title}</h1>
            <h2 className="text-xl tracking-wide mt-2">{description}</h2>
            <div className='text-md text-gray-500 mt-4'>By: {author}</div>
            <div className='text-md text-black mb-4'>Published on {formattedDate}</div>
            <hr className='border-1 border-black my-4'/>
            <div>
                <Image
                    src={test}
                    alt="Blog Post Thumbnail"
                    objectFit="contain"
                    className="aspect-video"
                />
                <div className=''>
                    {imageCaption}
                </div>
            </div>

        </div>
    )
}