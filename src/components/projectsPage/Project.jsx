import { Typography } from "@mui/material";
import { EditableResumeAccordion } from "../EditableResumeAccordion";

export function Project({ info, path }) {
  return (
    <EditableResumeAccordion
      title={info.name}
      subtitle={info.description}
      startDateString={info.startDate}
      endDateString={info.endDate}
      titlePath={`${path}.name`}
      subtitlePath={`${path}.description`}
      startDatePath={`${path}.startDate`}
      endDatePath={`${path}.endDate`}
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
              {info.showcase.map((details) => {
                // const isYoutubeLink = url.includes("youtube.com");
                // if (isYoutubeLink) {
                //   return <iframe src={url} title={info.name} />;
                // }
                return (
                  <li key={details.link}>
                    <Typography sx={{ textWrap: "balance" }}>
                      <a style={{ textWrap: "balance" }} href={details.link}>
                        {details.name}
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
    </EditableResumeAccordion>
  );
}
