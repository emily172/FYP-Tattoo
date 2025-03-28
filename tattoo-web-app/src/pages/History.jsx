import React from "react";

const History = () => {
  const studioHistory = {
    name: "Ink Pots Tattoo Studio",
    establishedYear: 2010,
    milestones: [
      { year: 2010, event: "Studio founded by John Doe, a visionary tattoo artist." },
      { year: 2013, event: "Expanded to include private tattoo rooms for client comfort." },
      { year: 2016, event: "Introduced award-winning artists to the team." },
      { year: 2020, event: "Voted Best Tattoo Studio in Waterford." },
      { year: 2023, event: "Hosted the first annual Ink Masters Tattoo Festival." },
    ],
    description:
      "Ink Pots Tattoo Studio has been at the forefront of the tattoo industry since its establishment in 2010. Known for its dedication to hygienic practices, artistry, and client satisfaction, the studio has grown into a renowned brand, inspiring countless artists and clients alike.",
    founder: "John Doe",
    achievements: [
      "Best Tattoo Studio in Waterford - 2020",
      "10,000+ satisfied clients",
      "Hosted the largest tattoo festival in Waterford",
    ],
  };

  return (
    <div className="container mt-5">
      <h1>About {studioHistory.name}</h1>
      <p>
        <strong>Established:</strong> {studioHistory.establishedYear}
      </p>
      <p>{studioHistory.description}</p>

      {/* Milestones Section */}
      <div className="mt-4">
        <h4>Milestones</h4>
        <ul>
          {studioHistory.milestones.map((milestone, index) => (
            <li key={index}>
              <strong>{milestone.year}:</strong> {milestone.event}
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements Section */}
      <div className="mt-4">
        <h4>Achievements</h4>
        <ul>
          {studioHistory.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>

      {/* Photo Timeline Section */}
      <div className="mt-4">
        <h4>Photo Timeline</h4>
        <div className="row">
          {studioHistory.milestones.map((milestone, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`https://placehold.co/300x200?text=${milestone.year}`}
                  alt={`Milestone ${index + 1}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <p>{milestone.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Section */}
      <div className="mt-4">
        <h4>Meet the Founder</h4>
        <p>
          <strong>{studioHistory.founder}</strong>: The visionary behind Ink Pots Tattoo Studio, known for combining
          artistry with professionalism to redefine the tattooing experience.
        </p>
      </div>
    </div>
  );
};

export default History;
