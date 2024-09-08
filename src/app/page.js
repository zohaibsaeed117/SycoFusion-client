import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";


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
      <CTA />
      <Testimonials />
    </>
  )
}