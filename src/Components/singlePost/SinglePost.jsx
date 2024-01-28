import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "./singlePost.css";
import Spinner from "../../Components/spinner/Spinner";  

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const { user } = useContext(Context);
  const URL = `http://localhost:3000/api`;

  useEffect(() => {
    setIsLoading(true);  
    axios.get(`${URL}/post/` + path).then((res) => {
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setTags(res.data.categories);
      setPhoto(res.data.photo);
      setIsLoading(false);  
    });
  }, [path]);

  const deletePost = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const payload = {
        username: user.username,
      };

      try {
        setIsLoading(true);  
        await axios.delete(`${URL}/post/` + path, { data: payload });
        toast.success("Post deleted successfully!");
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      } catch (error) {
        toast.error("Error deleting post");
        console.log(error);
      } finally {
        setIsLoading(false);  
      }
    }
  };

  const handleUpdate = async (e) => {
    const payload = {
      username: user.username,
      title: title,
      desc: desc,
      photo: photo,
    };

    try {
      setIsLoading(true);  // Set loading status to true during the update request
      await axios.put(`${URL}/post/` + path, payload);
      toast.success("Post updated successfully!");
      setUpdateMode(false);
      e.preventDefault();
    } catch (error) {
      toast.error("Error updating post");
      console.log(error);
    } finally {
      setIsLoading(false);  // Set loading status to false after the request is complete
    }
  };

  const tagsArr =
    tags &&
    tags.map((tag) => {
      return (
        <Link className="link" to={`/post?cat=${tag}`}>
          {tag}
        </Link>
      );
    });

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {isLoading ? (
          <Spinner />  
        ) : (
          <>
            {updateMode ? (
              
              <input
                type="text"
                value={photo}
                className="singlePostTitleInput"
                placeholder="Image URL"
                label='Image URL'
                autoFocus
                onChange={(e) => {
                  setPhoto(e.target.value);
                }}
              />
            ) : (
              post.photo && (
                <img className="singlePostImg" src={post.photo} alt="" />
              )
            )}

            {updateMode ? (
              <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                label='Title'
                autoFocus
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            ) : (
              <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username && (
                  <div className="singlePostEdit">
                    <TiEdit
                      className="singlePostIcon"
                      onClick={() => {
                        setUpdateMode(true);
                      }}
                    ></TiEdit>
                    <RiDeleteBin6Line
                      className="singlePostIcon "
                      onClick={deletePost}
                    ></RiDeleteBin6Line>
                  </div>
                )}
              </h1>
            )}

            <div className="tag-section">
              <ul style={{ color: "white" }}>{tagsArr}</ul>
            </div>

            <div className="singlePostInfo">
              <span>
                Author:
                <b className="singlePostAuthor">
                  <Link className="link" to={`/?username=${post.username}`}>
                    {post.username}
                  </Link>
                </b>
              </span>
              <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
              <textarea
                className="singlePostDesc"
                label='Story'
                style={{ color: "black" }}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            ) : (
              <p className="singlePostDesc">{desc}</p>
            )}
            {updateMode && (
              <button className="singlePostButton" onClick={handleUpdate}>
                Update Post
              </button>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
