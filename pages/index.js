// 1. Present ourselves to the world
//2. Show Posts
import Hero from "../componenets/Homepage/hero";
import FeaturedPosts from "../componenets/Homepage/featured-posts";
import {Fragment} from "react";
import {getFeaturedPosts} from "../lib/post-utils";

export const DUMMY_POSTS = [
    {
        slug: "getting-started-with-nextjs",
        title: "Getting Started with NextJS",
        image: "next.png",
        excerpt: "NextJS is the React Framework for Production",
        date: "2022-02-10"
    }
];

export default function Home(props) {
    return (
        <Fragment>
            <Hero/>
            <FeaturedPosts posts={
                props.posts
            }/>
        </Fragment>
    )
}

export function getStaticProps() {
    const posts = JSON.parse(JSON.stringify(getFeaturedPosts()));
    return {
        props: {
            posts
        },
        revalidate: 600
    }
}
