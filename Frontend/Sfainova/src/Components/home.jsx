import React from 'react';

function Home() {
  return (
    <div className="home">
      <h1>Waste Management Automation</h1>
      <p>Streamline waste disposal, recycling, and reduction in dark stores with cutting-edge IoT and AI technology.</p>
      <div className="features">
        <div className="feature-card">
          <h3>Efficient Disposal</h3>
          <p>Automate waste sorting and disposal processes.</p>
        </div>
        <div className="feature-card">
          <h3>Recycling Optimization</h3>
          <p>Maximize recycling with predictive analytics.</p>
        </div>
        <div className="feature-card">
          <h3>Sustainability Focus</h3>
          <p>Track carbon footprint and environmental impact.</p>
        </div>
      </div>
      <button className="cta-button">Learn More</button>
    </div>
  );
}

export default Home;