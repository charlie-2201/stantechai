import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postSlice';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import '../styles.css';

const Home = () => {
    const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p className="text-center text-xl font-bold">Loading...</p>;
    if (status === 'failed') return <p className="text-center text-red-500">Error loading posts.</p>;

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container p-4 mx-auto min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6 text-white">Posts</h1>
            <div className="mb-6 w-full max-w-lg">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white"
                />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl overflow-y-auto custom-scrollbar">
                <List
                    height={500}
                    itemCount={filteredPosts.length}
                    itemSize={60}
                    width={'100%'}
                >
                    {({ index, style }) => {
                        const post = filteredPosts[index];
                        if (!post) return null;

                        return (
                            <div style={style} className="border-b p-4 hover:bg-gray-300 transition-all">
                                <Link to={`/post/${post.id}`} className="text-lg text-blue-700 font-semibold hover:underline">
                                    {post.title}
                                </Link>
                            </div>
                        );
                    }}
                </List>
            </div>
        </div>
    );
};

export default Home;