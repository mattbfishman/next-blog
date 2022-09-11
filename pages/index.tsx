import type { NextPage } from 'next'
import client from "../helpers/fetch"
import { gql } from "@apollo/client"
import Card from '../components/card';
import FeaturedCard from '../components/featuedCard';
import HomeParser from '../parsers/home-parser'
import map from 'lodash/map';
import omit from 'lodash/omit';
const FEATURED = 'featured'
const TYPE = 'type';

interface Props {
  blogs: Array<Blog>
}

interface Blog {
  authors : String
  description: string
  type? : string
  subheader: string,
  title: string
  id: string
  thumbnail: string
}


const Home: NextPage<Props> = (_props: Props) => {
  let props   = _props,
      {blogs} = props,
      cards   = map(blogs, function(_blog: Blog){
        let blog = _blog || {}, 
            type = blog.type,
            cardProps = omit(blog, [TYPE]);

        if(type === FEATURED){
          return <FeaturedCard {...cardProps}/>
        } 

        return <Card {...cardProps}/>
      });

  return (
    <div className='grid grid-cols-4 gap-4 m-4'>
        {cards}
    </div>
  )
}

export async function getStaticProps() {
  var { data } = await client.query({
    query: gql`
      query{
        blogs(locale: "en", sort:"publishedAt:desc"){
          data {
            id
            attributes {
              title
              subheader
              type
              description
              thumbnail {
                data {
                  attributes {
                    url
                  }
                }
              }
              authors{
                data {
                  attributes{
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  var parser     = new HomeParser(),
      parsedData = parser.parse(data);
  debugger;
  return {
    props: {
      blogs: parsedData
    },
 };

}

export default Home
