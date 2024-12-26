import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10 pb-0">
        <aside>
          <div data-aos="zoom-in" data-aos-duration="1500">
            <img src="https://i.ibb.co.com/r08sLfd/Reco-Sphere.png" alt="" />
            <p>
              RecoSphere
              <br />
              Providing Product Recommendations since 1992
            </p>
          </div>
        </aside>
       
        <nav>
        
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className="social-icons bg-base-200 flex flex-col text-center pt-5">
        <p className="p-4">© 2024 RecoSphere. All rights reserved.</p>
        <div className="space-x-4 pt-3">
          <button>
            <a href="https://www.facebook.com">
              <FaFacebook className="text-2xl" />
            </a>
          </button>
          <button>
            <a href="https://github.com/">
              <BsGithub className="text-2xl" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
