import meImg from "../../src/assets/img/me.jpg"

export function AboutUs() {
  return (
    <div className="me flex">
      <section className="about-me flex-column">
        <h2>About Me</h2>
        <p>
          {" "}
          I'm Ido Feffer, a 26-year-old Fullstack Development student, currently
          studying at Coding Academy. I'm gaining hands-on experience with
          modern technologies like React, Node.js, MongoDB, and responsive
          design. The course is highly practical, project-driven, and focuses on
          building real-world applications from frontend to backend. I'm
          passionate about technology, creative problem-solving, and eager to
          keep growing as a developer.
        </p>
        <img src={meImg} alt="Me img" className="me-img" />
      </section>
    </div>
  )
}
