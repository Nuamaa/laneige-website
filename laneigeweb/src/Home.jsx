import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./Home.css";

import Navbar from "./Navbar";
import ShadeSelector from "./ShadeSelector";
import Footer from "./Footer";

import { FaTimes, FaCheck, FaClock } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    
    gsap.to("#text", {
      scrollTrigger: {
        trigger: "#text",
        start: "top bottom",
        toggleActions: "play none none reset",
      },
      ease: "power2.out",
      opacity: 1,
      y: 0,
    });
    gsap.to(".ls", {
      scrollTrigger: {
        trigger: ".ls",
        start: "top 80%",
        toggleActions: "play none none reset",
      },
      ease: "power2.out",
      opacity: 1,
      y: 0,
    });

    gsap.to(".fade-in", {
      scrollTrigger: {
        trigger: ".fade-in",
        start: "left bottom",
        toggleActions: "play none none reset",
      },
      ease: "power2.out",
      opacity: 1,
      x: 0,
    });

    let donutTimelines = [];

    const initDonutAnimations = () => {
      // kill old timelines and ScrollTriggers
      // donutTimelines.forEach((t) => t.kill && t.kill());
      // donutTimelines = [];
      // ScrollTrigger.getAll().forEach((st) => st.kill());

      const wrappers = gsap.utils.toArray(".donut-wrapper");
      wrappers.forEach((wrapper) => {
        const donut = wrapper.querySelector(".donut");
        const trail = wrapper.querySelector(".trail");
        const serum = wrapper.querySelector(".serum");
        const trailColor = wrapper.dataset.color || "#f8a";

        if (!donut || !trail || !serum) return;

        const wrapperWidth = wrapper.clientWidth || wrapper.offsetWidth || 600;
        const serumW = serum.offsetWidth || 80;
        const donutW = donut.offsetWidth || 50;

        const startLeft = serumW + 8;
        const maxTrailWidth = Math.max(30, wrapperWidth - startLeft - donutW - 16);

        gsap.set(serum, { left: 100 });
        gsap.set(trail, { left: startLeft, width: 0, background: trailColor });
        gsap.set(donut, { left: startLeft, x: -donutW - 20, rotation: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 80%",
          },
        });

        tl.to(trail, {
          width: maxTrailWidth,
          duration: 1.4,
          ease: "power5.out",
        }).to(
          donut,
          {
            x: maxTrailWidth-35,
            rotation: 720,
            duration: 1.6,
            ease: "power5.out",
          },
          "-=1.1"
        );

        donutTimelines.push(tl);
      });
    };

    initDonutAnimations();

    let resizeTO;
    const onResize = () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(() => {
        initDonutAnimations();
        ScrollTrigger.refresh();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    // Applicator + donuts 
    const applicator = gsap.utils.toArray(".im");
    applicator.forEach((image) => {
      const i1 = image.querySelector(".i1");
      const i2 = image.querySelector(".i2");
      const donuts = image.querySelectorAll(".i3");

      const t1 = gsap.timeline({
        scrollTrigger: { trigger: image, start: "top 70%" },
      });

      t1.to(i1, { width: 300, rotate: -15, duration: 1 }, 0)
        .to(i2, { width: 150, x: -20, duration: 1 }, 0.2);

      donuts.forEach((donut, i) => {
        gsap.fromTo(
          donut,
          { y: -200, opacity: 0 },
          {
            y: 500,
            opacity: 1,
            rotation: 360,
            duration: 1.5,
            delay: i * 0.3,
            ease: "bounce.out",
            scrollTrigger: { trigger: image, start: "top 70%" },
          }
        );
      });
    });

    const effectsContainer = document.getElementById("click-effects");

    const clickEffect = (e) => {
      const ripple = document.createElement("div");
      ripple.className = "click-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      effectsContainer.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove());

      for (let i = 0; i < 12; i++) {
        const sprinkle = document.createElement("div");
        sprinkle.className = "sprinkle";
        sprinkle.style.left = `${e.clientX}px`;
        sprinkle.style.top = `${e.clientY}px`;
        sprinkle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

        effectsContainer.appendChild(sprinkle);

        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 20 + 20;

        gsap.to(sprinkle, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          rotation: Math.random() * 720,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => sprinkle.remove(),
        });
      }
    };

    window.addEventListener("click", clickEffect);
    return () => window.removeEventListener("click", clickEffect);
  }, []);

  return (
    <div className="main">
      <Navbar />

      <div className="body1">
        {/* Hero */}
        <section className="hero">
          <video autoPlay muted playsInline className="hero-video">
            <source src="/Laneigehero.mp4" type="video/mp4" />
          </video>
        </section>

        {/* Intro */}
        <section>
          <h1 id="text" className="h1txt">
            GLAZE CRAZE TINTED LIP SERUM
          </h1>
          <div className="content-section">
            <img src="lan.png" alt="Laneige Lip Serum" className="lan" />
            <div className="content-text">
              <p id="para1" className="fade-in">
                A nourishing, tinted Korean skincare lip serum with
                donut-inspired shades & flavors for visibly plump lips and a
                high shine finish. This instantly hydrating, tinted lip serum is
                infused with 95% skincare ingredients to nourish the lip
                moisture barrier & provide 12 hours of hydration with buildable
                color. Features a unique donut applicator that feels plush and
                coats lips evenly.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section >
          <div id="text" className="para2">
            <div className="feature">
              <FaCheck className="icon2" />
              <p>All skin types</p>
            </div>
            <div className="feature">
              <FaClock className="icon2" />
              <p>12-Hour hydration</p>
            </div>
            <div className="feature">
              <FaTimes className="icon2" />
              <p>No Parabens, Phthalates, Sulfates</p>
            </div>
          </div>
        </section>

        {/* Donut shades */}
        <section className="sect">
          <h2 className="h2t">8-DONUT INSPIRED LIP TINTS</h2>
          <div className="container">
            <div className="donut-wrapper" data-color="#5a2b09">
              <img src="choco1d.png" alt="Chocolate Donut" className="img1 donut" />
              <div className="trail">Warm Brown</div>
              <img src="Chocolate.png" alt="Chocolate Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#9c6239">
              <img src="sugar1d.png" alt="Sugar Donut" className="img1 donut" />
              <div className="trail">Nude Beige</div>
              <img src="Sugar.png" alt="Sugar Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#844b4b">
              <img src="cinnamond.png" alt="Cinnamon Donut" className="img1 donut" />
              <div className="trail">Mauve Pink</div>
              <img src="Cinnamon.png" alt="Cinnamon Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#fb7e9fff">
              <img src="strawberry2d.png" alt="Strawberry Donut" className="img1 donut" />
              <div className="trail">Cool Pink</div>
              <img src="Strawberry.png" alt="Strawberry Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#cf4545ff">
              <img src="peachd.png" alt="Peach Donut" className="img1 donut" />
              <div className="trail">Peachy Coral</div>
              <img src="Peach.png" alt="Peach Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#b81111">
              <img src="raspberryd.png" alt="Raspberry Donut" className="img1 donut" />
              <div className="trail">Sheer Red</div>
              <img src="Raspberry.png" alt="Raspberry Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#9e6e4b">
              <img src="maple1d.png" alt="Maple Donut" className="img1 donut" />
              <div className="trail">Rosy Maple</div>
              <img src="Maple.png" alt="Maple Serum" className="serum" />
            </div>

            <div className="donut-wrapper" data-color="#5f0d3e">
              <img src="blueberryd.png" alt="Blueberry Donut" className="img1 donut" />
              <div className="trail">Vibrant Purple</div>
              <img src="Blueberry.png" alt="Blueberry Serum" className="serum" />
            </div>
          </div>
        </section>

        {/* Applicator */}
        <section className="sect">
          <div className="im">
            <img src="i1.png" className="i1" alt="Applicator Tube" />
            <img src="strawberry1d.png" className="i3" alt="Strawberry Donut" />
            <img src="maple2d.png" className="i3" alt="Maple Donut" />
            <img src="chocod.png" className="i3" alt="Chocolate Donut" />
            <img src="sugard.png" className="i3" alt="Sugar Donut" />
          </div>
          <h1 id="text" className="h1txt">DONUT-SHAPED APPLICATOR</h1>
          <div id="text" className="para3">
            <ul className="ul">
              <li><img src="swatchC.png" className="sw" alt="" /> Gently hugs the lips</li>
              <li><img src="swatchR.png" className="sw" alt="" /> Easy to blend out color</li>
              <li><img src="swatchS.png" className="sw" alt="" /> Cushiony applicator</li>
              <li><img src="swatchP.png" className="sw" alt="" /> No clumping on the lips</li>
            </ul>
          </div>
          <img src="i2.png" className="i2" alt="Applicator Wand" />
        </section>

        {/* Shade Selector */}
        <section className="sect">
          <ShadeSelector />
        </section>

        <section className="ls">
          <h1 id="text" className="l">COLOR-DRENCHED, SERUM-INFUSED</h1>
          <div id="ld" className="lastdiv">
            <img src="swatch.png" className="il"/>
            <p clas>Donut-inspired lip tints in 8 rich, glassy, universal nude shades</p>
          </div>
          <div id="ld" className="lastdiv">
            <img src="l.png" className="il"/>
            <p>100% felt the formula provides a glazed finish with one swipe</p>
          </div>
        </section>
      </div>

      <div id="click-effects"></div>

      <Footer />
    </div>
  );
};

export default Home;
