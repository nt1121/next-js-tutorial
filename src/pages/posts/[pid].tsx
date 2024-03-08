import { Post } from '@/types';
import Link from 'next/link';

function Post({ post } : { post: Post | null }) {
    let content;
    if (post) {
        content = (
            <>
                <h1 className={`font-bold text-xl mb-4`}>{post.title}</h1>
                <p>{post.body}</p>
            </>
        );
    } else {
        content = <p>No blog data.</p>;
    }
    return (
        <div className={`max-w-screen-sm mx-auto pt-4`}>
            <div className="mb-4">
                <Link href="/" className="underline">{`< TOPに戻る`}</Link>
            </div>
            {content}
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const { pid } = context.query;
    let post = null;
    try {
        const res = await fetch('http://localhost:3000/api/posts/' + pid);
        if (!res.ok) {
            throw new Error('Network response was not OK');
        }
        post = await res.json();
    } catch (error) {

    }
    return { props: { post } };
}

export default Post;


