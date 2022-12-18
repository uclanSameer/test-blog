import AllPosts from "../../componenets/posts/all-posts";
import {getAllPosts} from "../../lib/post-utils";

export default function AllPostsPage(props) {
    return (
        <AllPosts posts={props.allPosts}/>
    )
}

export function getStaticProps() {
    const allPosts = JSON.parse(JSON.stringify(getAllPosts()));
    return {
        props: {
            allPosts
        },
        revalidate: 600
    }
}