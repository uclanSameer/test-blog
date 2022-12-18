import PostContent from "../../componenets/posts/post-detail/post-content";
import {getPostData, getPostFiles} from "../../lib/post-utils";

export default function PostDetailPage(props) {
    return (
        <PostContent post={props.postData}/>
    )
}

export function getStaticProps(context) {
    const {params} = context;

    const {slug} = params;

    const postData = getPostData(slug);
    return {
        props: {
            postData
        },
        revalidate: 600
    }
}

export function getStaticPaths() {
    const postFilenames = getPostFiles();

    const slugs = postFilenames.map(filename => filename.replace(/\.md$/, ''));

    let paths = slugs.map(slug => (
        {
            params: {
                slug
            }
        }));

    return {
        paths: paths,
        fallback: false
    }

}