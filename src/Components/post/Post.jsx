import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  let catArr = []
  let postCat = post.categories

  if (postCat) {
    catArr = postCat.map((c) => {
      return (
        <span className="postCat" key={post._id}>
          <Link className="link" to={`/post?cat=${c}`}>
            {c}
          </Link>
        </span>
      )
    })
  }

  return (
    <div className="post">
      {
        post.photo &&
        <img
          className="postImg"
          src={post.photo}
          alt=""
        />
      }
      <div className="postInfo">
        <div className="postCats">
          {
            catArr
          }
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}