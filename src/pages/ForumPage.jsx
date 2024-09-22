import React, { useState, useEffect } from 'react';
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";
import axios from 'axios';
import config from '../../config.json';

const ForumPage = () => {
  const [state, setState] = useState({
    posts: [
        { id: 1, username: 'coolcat123', content: 'Does anyone know of any community efforts to plant more trees in West Philly? I have been thinking about volunteering.', comments: [] },
        { id: 2, username: 'jfrem', content: 'I had no idea certain areas of Philly were this much hotter. Thanks for sharing the tips!', comments: [] },
        { id: 3, username: 'cambk', content: 'Excited to join this community! Looking forward to sharing ideas and learning from everyone.', comments: [] },
        { id: 4, username: 'anjanab', content: 'A few more green spaces can make a big difference in reducing heat islands!', comments: [] },
        { id: 5, username: 'carolinec123', content: 'Let’s advocate for more funding to maintain and expand our urban forests!', comments: [] },
    ],
    newPostContent: '',
    newPostUsername: '',
    newCommentContent: {},
  });

  const rootURL = config.serverRootURL;

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
      comments: [],
    };
    setState({
      ...state,
      posts: [...state.posts, newPost],
      newPostContent: '',
      newPostUsername: '',
    });
  };

  const handleNewCommentChange = (postId, e) => {
    setState({
      ...state,
      newCommentContent: {
        ...state.newCommentContent,
        [postId]: e.target.value,
      },
    });
  };

  const handleNewCommentSubmit = (postId, e) => {
    e.preventDefault();
    const newComment = {
      id: state.posts.find(post => post.id === postId).comments.length + 1,
      content: state.newCommentContent[postId] || '',
    };
    const updatedPosts = state.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });
    setState({
      ...state,
      posts: updatedPosts,
      newCommentContent: {
        ...state.newCommentContent,
        [postId]: '',
      },
    });
  };

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
        <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-3/5 h-full font-Lato my-4">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold mb-6">Discussion Board</h1>
            <p className="mb-4">Join the conversation and share your thoughts with the community. </p>
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
                  <h3 className="text-lg font-bold mb-2">{'@' + post.username}</h3>
                  <p>{post.content}</p>
                  <div className="mt-4">
                    <h4 className="text-md font-bold mb-2">Comments</h4>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-200 p-2 rounded-md mb-2">
                        <p>{comment.content}</p>
                      </div>
                    ))}
                    <form onSubmit={(e) => handleNewCommentSubmit(post.id, e)}>
                      <input
                        type="text"
                        value={state.newCommentContent[post.id] || ''}
                        onChange={(e) => handleNewCommentChange(post.id, e)}
                        placeholder="Add a comment"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="submit"
                        className="mt-2 p-2 bg-[--cambridge-blue] hover:bg-[--khaki] text-white rounded-md"
                      >
                        Comment
                      </button>
                    </form>
                  </div>
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