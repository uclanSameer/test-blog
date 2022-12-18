import fs from 'fs'
import path from "path";
import matter from "gray-matter";

export function getAllPosts() {
    let postFiles = getPostFiles();

    return postFiles.map(postFile => getPostData(postFile))
        .sort((postA, postB) => postA.date > postB.date ? -1 : 1);
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.isFeatured);
}

export function getPostBySlug(slug) {
    const allPosts = getAllPosts();
    return allPosts.find(post => post.slug === slug);
}

export function getPostFiles() {
    const postsDirectory = path.join(process.cwd(), 'posts')
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension from the file name
    const filePath = path.join(process.cwd(), 'posts', `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // this is the gray-matter library that parses the front matter from the markdown file
    const {data, content} = matter(fileContent);

    return JSON.parse(JSON.stringify({
        slug: postSlug,
        ...data,
        content
    }));

}