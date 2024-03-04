import React from 'react'

const Header = () => {
  return (
    <section className="container py-5 text-center">
      <div className="row py-lg-5">
        <div className="mx-auto col-lg-6 col-md-8">
          <h1 className="fw-light">Album example</h1>
          <p className="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
          <p>
            <a href="#" className="my-2 btn btn-primary">Main call to action</a>
            <a href="#" className="my-2 btn btn-secondary">Secondary action</a>
          </p>
        </div>
      </div>
    </section>
)
}

export default Header