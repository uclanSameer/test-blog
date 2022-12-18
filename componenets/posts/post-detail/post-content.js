import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {atomDark} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
import Javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";

export default function PostContent(props) {
    const {post} = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        p(paragraph) {
            const {node} = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0];
                return (
                    <div className={classes.image}>
                        <Image
                            // the src attribute is the path to the image
                            // image.properties.src is the path to the image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        }
        ,
        code(code) {
            const {language, children} = code;
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={Javascript}
                >
                    {
                        children
                    }
                </SyntaxHighlighter>
            )
        }
    }
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath}/>
            <ReactMarkdown
                components={customRenderers}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    )
}