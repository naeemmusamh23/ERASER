import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./about-us.scss";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import GitHubIcon from "@material-ui/icons/GitHub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
const slidesData = [
  {
    id: 1,
    username: "Ishaq Alathamneh",
    testimonial: "Software developer",
    qoute:
      "You Dont Do The Right Thing For A Reward You Do It Because Its Right",
  },
  {
    id: 2,
    username: " Musab-Al-omari",
    testimonial: "Software developer",
    qoute:
      'It takes courage to sail into uncharted waters!" "Who said that?" "Snoopy!',
  },
  {
    id: 3,
    username: "Malak Almomani",
    testimonial: "Software developer",
    qoute:
      " The purpose of our lives is to be happy. ",
  },
  {
    id: 4,
    username: "Reem Alqurm",
    testimonial: "Software developer",
    qoute:
      " I alone cannot change the world, but I can cast a stone across the water to create many ripples ",
  },
  {
    id: 5,
    username: "Naeam Mosameh",
    testimonial: "Software developer",
    qoute:
      "Loyalty is a two-way street.If Im asking for it from you then youre getting it from me.",
  },
];
const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};
const Testimonial = () => {
  return (
    <React.Fragment>
      <section className="section backgroundOne">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
                <div className="card ">
                  <h3 className="main-heading">Our Vision</h3>
                      <span className = "visionCap"> Our Vision is 'together for a better future' make the learning easier and anywhere you can take your class and do the assignment that your teacher sign you to do it and everyone grows up with good culture because 'our children the future for the country'.</span>
                  <img className="imgvisio"
                    src="https://www.vippng.com/png/detail/195-1952958_device-allows-3-brains-to-connect-share-thoughts.png"/>
                </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="testimonial backgroundOne"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 0,
          marginBottom: 70,
        }}
      >
        <div style={{ width: "75%", textAlign: "center" }}>
          <h3 style={{ marginBottom: 20, color: "#0065E0" }}>Our Team</h3>
          <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
            <div>
              <Card img="https://avatars.githubusercontent.com/u/77914628?v=4" />
              <h3>{slidesData[0].username}</h3>
              <h6>{slidesData[0].testimonial}</h6>
              <p>
                {" "}
                <FontAwesomeIcon icon={faQuoteLeft} /> {slidesData[0].qoute}{" "}
                <FontAwesomeIcon icon={faQuoteRight} />{" "}
              </p>
              <div className="socialIcons">
                <Box>
                  <a>
                    <GitHubIcon />
                  </a>
                  <a>
                    <LinkedInIcon />
                  </a>
                  <a>
                    <FacebookIcon />
                  </a>
                </Box>
              </div>
            </div>
            <div>
              <Card img="https://avatars.githubusercontent.com/u/43066612?v=4" />
              <h3>{slidesData[2].username}</h3>
              <h6>{slidesData[2].testimonial}</h6>
              <p>
                {" "}
                <FontAwesomeIcon icon={faQuoteLeft} /> {slidesData[2].qoute}
                <FontAwesomeIcon icon={faQuoteRight} />{" "}
              </p>
              <div className="socialIcons">
                <Box>
                  <a>
                    <GitHubIcon />
                  </a>
                  <a>
                    <LinkedInIcon />
                  </a>
                  <a>
                    <FacebookIcon />
                  </a>
                </Box>
              </div>
            </div>
            <div>
              <Card img="https://avatars.githubusercontent.com/u/77915090?v=4" />
              <h3>{slidesData[4].username}</h3>
              <h6>{slidesData[4].testimonial}</h6>
              <p>
                {" "}
                <FontAwesomeIcon icon={faQuoteLeft} /> {slidesData[4].qoute}{" "}
                <FontAwesomeIcon icon={faQuoteRight} />{" "}
              </p>
              <div className="socialIcons">
                <Box>
                  <a>
                    <GitHubIcon />
                  </a>
                  <a>
                    <LinkedInIcon />
                  </a>
                  <a>
                    <FacebookIcon />
                  </a>
                </Box>
              </div>
            </div>
            <div>
              <Card img="https://avatars.githubusercontent.com/u/78753771?v=4" />
              <h3>{slidesData[3].username}</h3>
              <h6>{slidesData[3].testimonial}</h6>
              <p>
                {" "}
                <FontAwesomeIcon icon={faQuoteLeft} /> {slidesData[3].qoute}{" "}
                <FontAwesomeIcon icon={faQuoteRight} />{" "}
              </p>
              <div className="socialIcons">
                <Box>
                  <a>
                    <GitHubIcon />
                  </a>
                  <a>
                    <LinkedInIcon />
                  </a>
                  <a>
                    <FacebookIcon />
                  </a>
                </Box>
              </div>
            </div>
            <div>
              <Card img="https://avatars.githubusercontent.com/u/77916712?v=4" />
              <h3>{slidesData[1].username}</h3>
              <h6>{slidesData[1].testimonial}</h6>
              <p>
                {" "}
                <FontAwesomeIcon icon={faQuoteLeft} /> {slidesData[1].qoute}{" "}
                <FontAwesomeIcon icon={faQuoteRight} />{" "}
              </p>
              <div className="socialIcons">
                <Box>
                  <a>
                    <GitHubIcon />
                  </a>
                  <a>
                    <LinkedInIcon />
                  </a>
                  <a>
                    <FacebookIcon />
                  </a>
                </Box>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};
const Card = ({ img }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "gray",
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          width: 120,
          height: 120,
          border: "1px solid lightgray",
          padding: 7,
          marginBottom: 20,
        }}
      />
    </div>
  );
};
export default Testimonial;