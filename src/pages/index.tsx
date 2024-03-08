import { useState, useEffect } from "react";
import Link from 'next/link';

function Blog() {
    const [posts, setPosts] = useState<[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setLoading] = useState<boolean>(false);

    async function getPosts(page: number) {
        setLoading(true);
        setCurrentPage(page);
        try {
            const res = await fetch('http://localhost:3000/api/posts?page=' + page);
            if (!res.ok) {
                throw new Error('Network response was not OK');
            }
            const data = await res.json();
            setTotalPages(Math.ceil(data.total / 10));
            setPosts(data.posts);
            setLoading(false);
        } catch (error) {
            console.log('情報の取得に失敗しました。');
        }
    }

    function handleClickPageMove(num: number) {
        getPosts(currentPage + num);
    }

    useEffect(() => {
        getPosts(1);
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!posts) return <p>No blog data</p>;

    return (
        <div className={`max-w-screen-sm mx-auto pt-4`}>
            <h1 className={`font-bold text-xl mb-4`}>ブログ</h1>
            <ul>
                {posts.map((post: any) => (
                    <li key={post.id}><Link href={`/posts/${post.id}`} className="underline">{post.title}</Link></li>
                ))}
            </ul>
            <div className="mt-4">
                { currentPage !== 1 ? <button type="button" className={`bg-gray-500 hover:bg-gray-600 text-white rounded px-2 py-1`} onClick={() => handleClickPageMove(-1)}>{`< 前のページ`}</button> : '' }
                <span className="mx-4">{`${currentPage}ページ目`}</span>
                { (totalPages > 1 && totalPages > currentPage) ? <button type="button" className={`bg-gray-500 hover:bg-gray-600 text-white rounded px-2 py-1`} onClick={() => handleClickPageMove(1)}>{`次のページ >`}</button> : '' }
            </div>
        </div>
    );
}

export default Blog;
