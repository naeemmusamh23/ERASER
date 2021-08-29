import React from "react";
import "./Footer.scss";
import Box from "@material-ui/core/Box";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
function Footer() {
  return (
    <section className="section footer text-white">
      <div className="continer">
        <div className="row">
          <div className="col-md-4">
          <img src="./bt2.png" alt="logo" className="footerLogo" />
            <hr />
            <p className="text-white mb-1">
              It is an online education website that will help the educational
              process to be easy and safe due to the COVID-19 situation.
            </p>
          </div>
          <div className="col-md-4">
            <hr className="hrsc"/>
            <div className="socialIcons">
              <Box>
                <a><GitHubIcon /></a>
                <a><TwitterIcon /></a>
                <a><YouTubeIcon /></a>
                <a><FacebookIcon /></a>
              </Box>
            </div>
          </div>
          {/* ------------------------------------------ */}
          <div className="col-md-4 ">
            <h6>Contact Information</h6>
            <hr />
            <div>
              <p className="text-white mb-1"> 7th circle , Amman , Jordan</p>
            </div>
            <div>
              <p className="text-white mb-1">+962 799-581-288</p>
            </div>
            <div>
              <p className="text-white mb-1">+962 - 796-663-286 </p>
            </div>
            <div>
              <p className="text-white mb-1">eraser@gmail.com </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Footer;