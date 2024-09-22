import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";

function About() {
  return (
    <div className="container about-container">
      <PageHeader
        title={
          <>
            About <Logo />
          </>
        }
        description="Learn more about our project and its goals."
      />
      <div className="about-content">
        <h2>About the Project</h2>
        <p>
          Welcome to our project, an innovative platform designed to help
          businesses showcase themselves in a professional and inviting manner.
          The project aims to create a user-friendly and intuitive experience,
          allowing users to easily create and manage digital business cards.
        </p>
        <h3>
          <Logo /> Goals
        </h3>
        <ul>
          <li>
            <strong>Ease of Use:</strong> We strive to make the card creation
            process simple and accessible for everyone, with no prior technical
            knowledge required.
          </li>
          <li>
            <strong>Modern Design:</strong> Our interface is crafted to be
            aesthetically pleasing and inviting, focusing on a smooth user
            experience. The cards are designed to highlight the most important
            information.
          </li>
          <li>
            <strong>Customization:</strong> Users can personalize their business
            cards, choosing colors, fonts, and images, allowing the cards to
            reflect their brand identity.
          </li>
          <li>
            <strong>Multi-Device Support:</strong> Our platform is optimized for
            browsing on mobile devices as well as desktops, ensuring convenient
            access anytime and anywhere.
          </li>
        </ul>
        <h3>Technologies Used</h3>
        <p>The project is developed using modern technologies, including:</p>
        <ul>
          <li>
            <strong>React:</strong> For a dynamic and responsive development
            environment.
          </li>
          <li>
            <strong>Axios:</strong> To perform HTTP requests easily and
            efficiently.
          </li>
          <li>
            <strong>Formik and Yup:</strong> For easy form management and input
            validation.
          </li>
          <li>
            <strong>Bootstrap:</strong> For responsive design, ensuring optimal
            user experience across various devices.
          </li>
        </ul>
        <h3>Why Choose Us?</h3>
        <p>
          Understanding that digital business cards are essential tools for
          success in the digital age, we offer a platform developed with
          business owners' needs in mind. Whether you are a freelancer, a small
          business owner, or part of a large corporation, we are here to help
          you present your information in the best possible way.
        </p>
        <h3>Join Us!</h3>
        <p>
          We invite you to join us and create a digital business card that
          stands out in a competitive market. All you need to do is get started,
          and we’ll take care of the rest!
        </p>
      </div>
    </div>
  );
}

export default About;
