import featured from '../public/featured.jpg';
import Image from 'next/image';
import Link from 'next/link'

interface Blog {
    authors : String
    description: string
    subheader: string,
    title: string
    id: string,
    thumbnail: string
  }
  

  
export default function FeaturedCard(_props: Blog){
    var props       = _props || {},
        subheader   = props.subheader,
        title       = props.title,
        authors     = props.authors,
        description = props.description,
        id          = props.id,
        thumbnail   = props.thumbnail;
    return(
        <div className="grid grid-cols-5 p-4 border-gray-400 border col-span-2 min-h-full drop-shadow-sm">
            <div className='col-span-2 mr-4'>
                <Image
                    src={thumbnail}
                    alt="Featured Image"
                    className='rounded'
                    height={400}
                    width={400}
                />
            </div>
            <div className='col-span-3'>
                <h1 className="text-2xl font-semibold tracking-wider">{title}</h1>
                <h2 className="text-md">{subheader}</h2>
                <span className="block text-md text-gray-500 py-2">By {authors}</span>
                <p className="self-center">
                    {description}
                </p>
                <Link href={`/blog/${id}`}>
                    <a className='text-blue-700'>Read More</a>
                </Link>
            </div>
        </div>
    )
}