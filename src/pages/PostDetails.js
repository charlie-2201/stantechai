import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts.find(p => p.id === Number(id)));

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>
      <Link to="/" className="text-blue-500 mt-4 block">Back to Posts</Link>
    </div>
  );
};

export default PostDetails;
