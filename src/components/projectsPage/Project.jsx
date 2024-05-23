import { Typography } from "@mui/material";
import { ResumeAccordion } from "../ResumeAccordion";

export function Project({ info }) {
  return (
    <ResumeAccordion
      title={info.name}
      subtitle={info.description}
      startDateString={info.startDate}
      endDateString={info.endDate}
    >
      <div>
        {info.highlights && info.highlights.length > 0 && (
          <ul>
            {info.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}
        {info.showcase && info.showcase.length > 0 && (
          <div>
            <Typography variant="h6">Other Links</Typography>
            <ul>
              {info.showcase.map((url) => {
                // const isYoutubeLink = url.includes("youtube.com");
                // if (isYoutubeLink) {
                //   return <iframe src={url} title={info.name} />;
                // }
                return (
                  <li>
                    <Typography sx={{ textWrap: "balance" }}>
                      <a style={{ textWrap: "balance" }} href={url}>
                        {url}
                      </a>
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {info.url && (
          <Typography>
            <a href={info.url}>See Project</a>
          </Typography>
        )}
      </div>
    </ResumeAccordion>
  );
}
