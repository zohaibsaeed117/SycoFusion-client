import Login from "@/components/Login";
import Navbar from "../components/Navbar";
import Signup from "@/components/Signup";
import Post from "@/components/PostFeedView";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";


export default function () {
  return (
    <>
      {// <div style={{
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   minHeight: '100vh'
        // }}>
        //   <h1>Homepage</h1>
        // </div>
      }
      <HeroSection />
      <Testimonials />
    </>
  )
}