import React from 'react'

const HeroSection = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(./bg.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Welcome to Sycofusion the ultimate gathering place for developers! Immerse yourself in a community built by and for coding enthusiasts. Sycofusion is where innovation thrives, collaboration sparks, and the world of development unfolds. Join us on a journey where lines of code transform into impactful solutions. Synergy, coding, and fusion your digital space for developer excellence. Let's build the future together! </p>
                    <a href='/login' className="btn btn-primary">Get Started</a>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
