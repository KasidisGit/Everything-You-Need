import React from "react";
import { Carousel } from "react-responsive-carousel";
import ads1 from "../src/images/ads/ads-1.jpg";
import ads2 from "../src/images/ads/ads-2.jpg";
import ads3 from "../src/images/ads/ads-3.jpg";
import ads4 from "../src/images/ads/ads-4.jpg";
import ads5 from "../src/images/ads/ads-5.jpg";

export default () => (
  <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className="slider-container">
    <div>
      <img alt="" src={ads1} />
    </div>
    <div>
      <img alt="" src={ads2} />
    </div>
    <div>
      <img alt="" src={ads3} />
    </div>
    <div>
      <img alt="" src={ads4} />
    </div>
    <div>
      <img alt="" src={ads5} />
    </div>
  </Carousel>
);
