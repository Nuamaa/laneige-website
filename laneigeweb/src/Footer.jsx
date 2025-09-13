import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";
import Logo from "./assets/LANEIGE.svg";
import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    gsap.to(".footer-pink", {
      x: "0%", 
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        end: "bottom bottom",
        scrub: 4,
      },
    });
  }, []);

  return (
    <footer className="footer">
      {/* Blue base */}
      <div className="footer-blue">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="footer-links">
          <div>
            <h4>LANEIGE PRODUCTS</h4>
            <p>Shop All</p>
            <p>Best Sellers</p>
            <p>New</p>
          </div>
          <div>
            <h4>CUSTOMER CARE</h4>
            <p>Contact Us</p>
            <p>Shipping & Returns</p>
            <p>Privacy Notice</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className="footer-bottom">
          <hr />
          <div className="social-icons">
            <FaInstagram className="iconb" />
            <FaYoutube className="iconb" />
            <FaPinterest className="iconb" />
          </div>
          <hr />
          <br />
          <p>This is an unofficial student concept project, created for learning purposes. <br />
          Copyright ⓒ 2025</p>
        </div>
      </div>

      {/* Pink overlay */}
      <div className="footer-pink">
        <h3>Sign up for email updates</h3>
        <p>
          Receive exclusive online offers, news about our latest products and
          more!
        </p>
        <input type="email" placeholder="Email Address" />
        <button>SIGN UP</button>
      </div>
    </footer>
  );
};

export default Footer;
