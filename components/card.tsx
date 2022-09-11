import Image from 'next/image';
import test from '../public/test.jpg';
import Link from 'next/link';

interface Blog {
    authors : String
    description: string
    subheader: string,
    title: string
    id: string
    thumbnail: string
  }
  

export default function Card(_props: Blog){
    var props       = _props || {},
        subheader   = props.subheader,
        title       = props.title,
        authors     = props.authors,
        description = props.description,
        id          = props.id,
        thumbnail   = props.thumbnail;

    return(
        <div className="flex flex-col p-4 border-gray-400 border row-span-2 drop-shadow-sm">
            <Image
                src={thumbnail}
                alt="Featured Image"
                className='rounded'
                height={400}
                width={400}
            />
            <h1 className="text-xl font-semibold tracking-wider">{title}</h1>
            <h2 className="text-md">{subheader}</h2>
            <span className="text-md text-gray-500 py-1">By {authors}</span>
            <p className="self-center">
                {description}
            </p>
            <Link href={`/blog/${id}`}>
                <a className='text-left text-blue-700'>Read More</a>
            </Link>
        </div>
    )
}