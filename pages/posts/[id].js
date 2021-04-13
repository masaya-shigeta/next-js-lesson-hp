import Link from "next/link";
import Layout from "../../components/Layout"
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
    if (!post) {
        return <div>Loading ...</div>;
    }

    return (
        <Layout title={post.title}>
            <p className="m-4">
                {"ID : "}
                {post.id}
            </p>
            <p className="mb-8 text-xl font-bold">{post.title}</p>
            <p className="px-10">{post.body}</p>
            <Link href="/blog-page">
                <div className="flex cursor-pointer mr-12">
                    <span>Back to blog-page</span>
                </div>
            </Link>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { post: post } = await getPostData(params.id);
    return {
        props: {
            post,
        },
    };
}
