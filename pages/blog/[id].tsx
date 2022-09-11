import type { NextPage } from 'next'
import BlogHeader from '../../components/blogHeader'
import BlogBody from '../../components/blogBody'
import Timeline from '../../components/timeline'
import client from "../../helpers/fetch"
import { gql } from "@apollo/client"
import BlogParser from '../../parsers/blog-parser'
import RouteParser from '../../parsers/route-parser'
import get from 'lodash/get';

import { useRouter } from 'next/router';

interface StaticPaths {
    params: Params
}

interface Params {
    id: String
}

interface ReturnObj {
  blog: Object,
  timeline: Array<Object>
}

const Blog: NextPage = (_props: Object) => {
  const router = useRouter();
  if (router.isFallback)  return <div>Find Blog...</div>;

  var props: any = _props || {},
      blog  = props.blog,
      body   = blog.body,
      timeline = blog.timeline;

  return (
    <div className='grid grid-cols-5 mt-4'>
        <div className='col-span-1'>
            <Timeline timeline={timeline}/>
        </div>
        <div className='col-span-4 mr-16'>
            <BlogHeader {...blog}/>
            <BlogBody body={body}/>
        </div>
    </div>
  )
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
          query{
            blogs(locale: "en", sort:"publishedAt"){
                data {
                id
                }
            }
          }
        `,
    });

    var parser     = new RouteParser(),
        parsedData = parser.parse(data);

    return {
      paths: parsedData,
      fallback: true,
    }
  }

export async function getStaticProps(staticPaths: StaticPaths) {
  const {params} = staticPaths;
  const {id} = params;
  var { data } = await client.query({
    query: gql`
      query{
        blog(id: ${id}){
          data {
            id
            attributes{
              authors{
                data {
                  id
                  attributes{
                    name
                  }
                }
              }
              body
              thumbnail {
                data {
                  attributes {
                    url
                  }
                }
              }
              description
              title
              publishedAt
              subheader
            }
          }
        }
      }
    `,
  });
  var timeline = await client.query({
    query: gql`
      query{
        blogs(locale: "en", sort:"publishedAt:desc"){
          data {
            id
            attributes {
              publishedAt
              title
            }
          }
        }
      }
    `
  });

  var timelineBlogs = get(timeline, 'data.blogs.data', []); 
  var ret: ReturnObj = {
    timeline: [...timelineBlogs],
    blog: data.blog
  }
  var parser     = new BlogParser(),
      parsedData = parser.parse(ret);

  return {
    props: {
      blog: parsedData
    },
 };
}


export default Blog
