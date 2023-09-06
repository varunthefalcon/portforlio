import Randomizer from "./randomizer";
import "./App.scss";
import varun from "./varun.png";
import { AiFillFacebook, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { FaStackOverflow, FaPhoneSquareAlt, FaLinkedin } from "react-icons/fa";
import { ImFolderDownload } from "react-icons/im";
import { MdAutoGraph } from "react-icons/md";
import { DiAndroid } from "react-icons/di";
import { useState } from "react";
import { useEffect } from "react";

const floatInfo = [
  {
    id: "github",
    label: "Github",
    Icon: AiFillGithub,
    link: "https://github.com/varunthefalcon",
  },
  {
    id: "facebook",
    label: "Facebook",
    Icon: AiFillFacebook,
    link: "https://www.facebook.com/varunthefalcon/",
  },
  // {
  //   id: "youtube",
  //   label: "Youtube",
  //   Icon: AiFillYoutube,
  //   link: "https://www.youtube.com/@varuns6451",
  // },
  {
    id: "gmail",
    label: "varunsk.dev",
    Icon: BiLogoGmail,
    link: "mailto:varunsk.dev@gmail.com?Subject=Very excited to work with you",
  },
  {
    id: "stackoverflow",
    label: "Stackoverflow",
    Icon: FaStackOverflow,
    link: "https://stackoverflow.com/users/8129206/varun-suresh-kumar",
  },
  {
    id: "phone",
    label: "7552759961 \n  Mobile(UK)",
    Icon: FaPhoneSquareAlt,
    link: "tel: +44 7552759961",
  },
  {
    id: "android_app",
    label: "Android\n App",
    Icon: DiAndroid,
    link: "https://play.google.com/store/apps/details?id=com.varunthefalcon.securebook&pli=1",
  },
  {
    id: "resume",
    label: "CV",
    Icon: ImFolderDownload,
    highlight: true,
    download: true,
    link: "https://github.com/varunthefalcon/drunk-portfolio/raw/master/Varun_SK_Frontend_CV.pdf",
  },
  {
    id: "autoEDA",
    label: "AutoEDA",
    Icon: MdAutoGraph,
    highlight: true,
    link: "/autoeda",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    Icon: FaLinkedin,
    link: "https://www.linkedin.com/in/varun-sureshkumar/",
  },
];

function Portfolio() {
  const fontsArr = [
    "'Comic Neue', cursive",
    "'Roboto', sans-serif",
    "'Dancing Script', cursive",
    "'Gloria Hallelujah', cursive",
    "'Ubuntu', sans-serif",
    "'Kumar One', cursive",
  ];

  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((index) => {
        return index >= fontsArr.length ? 0 : index + 1;
      });

      return () => clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <div className="wrapper">
      <div className="pic_wrapper">
        <img src={varun} alt="bust" className="pic" />
        <div className="grids">
          <div style={{ position: "relative", textAlign: "center" }}>
            {floatInfo.map(
              ({
                id,
                link,
                label,
                Icon,
                download = false,
                highlight = false,
              }) => (
                <Randomizer key={id} highlight={highlight}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={link}
                    download={download}
                    className="icon_labels"
                  >
                    <Icon color="white" size={"3rem"} />
                    {label}
                  </a>
                </Randomizer>
              )
            )}
          </div>
        </div>
        <p className="name" style={{ fontFamily: fontsArr[fontIndex] }}>
          VARUN SK
        </p>
      </div>
    </div>
  );
}

export default Portfolio;
