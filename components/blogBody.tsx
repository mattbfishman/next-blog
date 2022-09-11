
interface Props {
    body: string;
}

export default function BlogBody(props: Props){
    return(
        <div className='whitespace-pre-wrap'
            dangerouslySetInnerHTML={{__html: props.body}}
        >
        </div>
    )
}