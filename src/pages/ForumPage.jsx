import React, { useState } from 'react';
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

const ForumPage = () => {
  const [state, setState] = useState({
    posts: [
      { id: 1, username: 'John Doe', content: 'Hello, world!' },
      { id: 2, username: 'Jane Doe', content: 'Hi, John!' },
    ],
    newPostContent: '',
    newPostUsername: '',
  });

  const handleNewPostUsernameChange = (e) => {
    setState({ ...state, newPostUsername: e.target.value });
  };

  const handleNewPostContentChange = (e) => {
    setState({ ...state, newPostContent: e.target.value });
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: state.posts.length + 1,
      username: state.newPostUsername,
      content: state.newPostContent,
    };
    setState({
      ...state,
      posts: [...state.posts, newPost],
      newPostContent: '',
      newPostUsername: '',
    });
  };

return (
    <div className="flex flex-col">
        <NavBar />
        <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
            <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-3/5 h-full font-Lato my-4">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <h1 className="text-3xl font-bold mb-6">Discussion Board</h1>
                    <p className="mb-4">Join the conversation and share your thoughts with the community</p>
                </div>
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <h2 className="text-2xl font-bold mb-4">New Post</h2>
                    <form onSubmit={handleNewPostSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={state.newPostUsername}
                                onChange={handleNewPostUsernameChange}
                                placeholder="Enter your username"
                                className="min-w-80 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                value={state.newPostContent}
                                onChange={handleNewPostContentChange}
                                placeholder="Enter your post content"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-2 p-2 bg-[--cambridge-blue] hover:bg-[--khaki] text-white rounded-md"
                        >
                            Post
                        </button>
                    </form>
                </div>
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <h2 className="text-2xl font-bold mb-4">Posts</h2>
                    <div className="space-y-4">
                        {state.posts.map((post) => (
                            <div key={post.id} className="bg-gray-100 p-4 rounded-md w-full">
                                <h3 className="text-lg font-bold mb-2">{post.username}</h3>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <BottomBar />
    </div>
);
};

export default ForumPage;