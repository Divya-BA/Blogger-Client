import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setImg] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const { user } = useContext(Context);
  const URL = `http://localhost:3000/api`;

  React.useEffect(() => {
    async function getCat() {
      const res = await axios.get(`${URL}/category/`);
      const data = res.data;
      const catArr = data.map((d) => d.name);
      setCategory(catArr);
    }
    getCat();
  }, []);

  const suggestions = category.map(cat => ({
    id: cat,
    text: cat
  }));

  const KeyCodes = {
    comma: 188,
    enter: 13
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  React.useEffect(() => {
    setCategories(tags.map((tag) => tag.id));
  }, [tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      photo,
      categories
    };

    try {
      const response = await axios.post(`${URL}/post`, newPost);

      toast.success('Post created successfully!');

      setTimeout(() => {
        window.location.replace('/post/' + response.data._id);
      }, 2000); 
    } catch (error) {
      console.error(error);

      toast.error('Error creating post. Please try again.');
    }
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />
          <input
            className="writeInput"
            placeholder="Image URL (Optional)"
            type="text"
            autoFocus={true}
            onChange={(e) => setImg(e.target.value)}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
