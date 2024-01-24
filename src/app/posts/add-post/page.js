import Navbar from "@/components/Navbar";
import NewPost from "@/components/NewPost";
import Post from "@/components/PostFeedView";


export default function () {
  return (
    <div>
      <h1 className="my-10 text-center font-bold text-4xl">Add a Post</h1>
<NewPost />
      </div>
  )
}