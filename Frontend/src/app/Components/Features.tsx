import React from "react";
import AboutUs from "../about/About";

const elocateFeatures = [
  {
    number: "01",
    title: "Automated Waste Sorting",
    description:
      "Technology automatically categorizes waste into different types, improving sorting accuracy and reducing manual labor",
  },
  {
    number: "02",
    title: "Real-time Waste Monitoring",
    description:
      "Sensors track waste levels in containers, enabling efficient scheduling and preventing overflow.",
  },
  {
    number: "03",
    title: "Optimized Collection Routes",
    description:
      "AI-driven systems optimize waste collection paths within the store to save time and resources.",
  },
  {
    number: "04",
    title: "Waste Reduction Insights",
    description:
      "Data analysis identifies waste patterns, helping stores adjust operations to minimize waste generation.",
  },
  {
    number: "05",
    title: "Integration with Sustainability Goals",
    description:
      "Automated systems help track and report waste-related data, supporting environmental sustainability efforts.",
  },
  {
    number: "06",
    title: "Automated Waste Recycling",
    description:
      "Machines separate recyclable materials automatically, streamlining the recycling process and reducing reliance on external services.",
  },
];

const Features: React.FC = () => {
  return (
    <>
      <section className=" features" id="features" aria-label="features">
        <div className="container mx-auto px-4 pb-4 text-center">
          <AboutUs />
          <ul className="grid-list section py-20 my-2">
            {elocateFeatures.map((feature, index) => (
              <li key={index}>
                <div className="features-card">
                  <data className="card-number" value={feature.number}>
                    {feature.number}
                  </data>
                  <h3 className="h3 card-title">{feature.title}</h3>
                  <p className="card-text text-2xl">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Features;