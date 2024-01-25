import React from 'react'

const CTA = () => {
    return (
        <div>
            <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Sycofusion: Igniting Innovation, Fostering Collaboration, and Empowering Developers Globally.
                        </h2>

                        <p className="hidden text-gray-500 md:mt-4 md:block">
                        Sycofusion welcomes you to a thriving community of developers globally. Here, innovation intertwines with collaboration, creating a dynamic space where your coding potential knows no bounds. Join us on this exciting journey where ideas converge, skills amplify, and extraordinary solutions emerge. Sycofusion is more than a platform; it's your destination for unlocking new possibilities in the world of development. Explore, connect, and elevate your coding experience with us
                        </p>

                        <div className="mt-4 md:mt-8">
                            <a
                                href="/signup"
                                className="btn btn-primary"
                            >
                                Get Started Today
                            </a>
                        </div>
                    </div>
                </div>

                <img
                    alt="Student"
                    src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-56 w-full object-cover sm:h-full"
                />
            </section>
        </div>
    )
}

export default CTA