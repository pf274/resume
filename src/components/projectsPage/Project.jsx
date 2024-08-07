import { Button, Fab, Switch, TextField, Typography } from "@mui/material";
import { EditableResumeAccordion } from "../EditableResumeAccordion";
import { EditableTypography } from "../EditableTypography";
import { ArrowDropDown, ArrowDropUp, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useResumeContext } from "../../contexts/ResumeContext";
import { getNewHighlight } from "../../helperFuncs";

export function Project({ info, path }) {
  const [highlights, setHighlights] = useState(info.highlights || []);
  const [otherLinks, setOtherLinks] = useState(info.showcase || []);
  const [mainUrl, setMainUrl] = useState(info.url || '');
  const [mainUrlVisible, setMainUrlVisible] = useState(info.url);
  const {moveUp, moveDown, add, remove, authToken, replace} = useResumeContext();
  function deleteHighlight(index) {
    const newHighlights = [...highlights].filter((_, i) => i !== index);
    remove(`${path}.highlights.${index}`);
    setSkills(newHighlights);
  }
  function addHighlight() {
    const newHighlight = getNewHighlight();
    add(newHighlight, `${path}.highlights`);
    setHighlights((prevSkills) => [
      ...prevSkills,
      newHighlight,
    ]);
  }
  function moveHighlightUp(index) {
    if (index == 0) {
      return;
    }
    setHighlights((prevHighlights) => {
      const newHighlights = [...prevHighlights];
      const temp = newHighlights[index];
      newHighlights[index] = newHighlights[index - 1];
      newHighlights[index - 1] = temp;
      return newHighlights;
    });
    moveUp(`${path}.highlights.${index}`);
  }
  function moveHighlightDown(index) {
    if (index == highlights.length - 1) {
      return;
    }
    setHighlights((prevHighlights) => {
      const newHighlights = [...prevHighlights];
      const temp = newHighlights[index];
      newHighlights[index] = newHighlights[index + 1];
      newHighlights[index + 1] = temp;
      return newHighlights;
    });
    moveDown(`${path}.highlights.${index}`);
  }
  function deleteOtherLink(index) {
    const newOtherLinks = [...otherLinks].filter((_, i) => i !== index);
    remove(`${path}.showcase.${index}`);
    setOtherLinks(newOtherLinks);
  }
  function addOtherLink() {
    const newLink = `https://www.${Array(10).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("")}.com`;
    const newName = `Name ${Array(10).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("")}`;
    const newOtherLink = {name: newName, link: newLink};
    console.log('path:', `${path}.showcase`)
    add(newOtherLink, `${path}.showcase`);
    setOtherLinks((prevOtherLinks) => [
      ...prevOtherLinks,
      newOtherLink,
    ]);
  }
  function moveOtherLinkUp(index) {
    if (index == 0) {
      return;
    }
    setOtherLinks((prevOtherLinks) => {
      const newOtherLinks = [...prevOtherLinks];
      const temp = newOtherLinks[index];
      newOtherLinks[index] = newOtherLinks[index - 1];
      newOtherLinks[index - 1] = temp;
      return newOtherLinks;
    });
    moveUp(`${path}.showcase.${index}`);
  }
  function moveOtherLinkDown(index) {
    if (index == otherLinks.length - 1) {
      return;
    }
    setOtherLinks((prevOtherLinks) => {
      const newOtherLinks = [...prevOtherLinks];
      const temp = newOtherLinks[index];
      newOtherLinks[index] = newOtherLinks[index + 1];
      newOtherLinks[index + 1] = temp;
      return newOtherLinks;
    });
    moveDown(`${path}.showcase.${index}`);
  }
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
        {highlights.length > 0 && (
          <ul>
            {highlights.map((highlight, index) => (
              <li key={`${index}/${highlights.length}/${highlight}`}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
                  <EditableTypography
                    value={highlight}
                    path={`${path}.highlights.${index}`}
                    placeholder="highlight"
                    multiline
                  />
                  <Fab
                    size="small"
                    onClick={(event) => {
                      deleteHighlight(index);
                      event.stopPropagation();
                    }}
                    color="error"
                  >
                    <Delete />
                  </Fab>
                  <Fab
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (index != 0) {
                        moveHighlightUp(index);
                      }
                    }}
                    disabled={index == 0}
                  >
                    <ArrowDropUp />
                  </Fab>
                  <Fab
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (index != highlights.length - 1) {
                        moveHighlightDown(index);
                      }
                    }}
                    disabled={index == highlights.length - 1}
                  >
                    <ArrowDropDown />
                  </Fab>
                </div>
              </li>
            ))}
          </ul>
        )}
        {authToken && <Button onClick={addHighlight}>Add Highlight</Button>}
        {((otherLinks.length > 0) || authToken) && <Typography variant="h6">Other Links</Typography>}
        <ul>
          {otherLinks.map((details, index) => {
            // const isYoutubeLink = url.includes("youtube.com");
            // if (isYoutubeLink) {
            //   return <iframe src={url} title={info.name} />;
            // }
            return (
              <li key={`${index}/${info.showcase.length}/${details.link}`}>
                <div>
                  {authToken && <div style={{display: 'flex', gap: '1em'}}>
                    <EditableTypography
                      value={details.name}
                      path={`${path}.showcase.${index}.name`}
                      placeholder="name"
                      multiline
                      />
                    <EditableTypography
                      value={details.link}
                      path={`${path}.showcase.${index}.link`}
                      placeholder="url"
                      multiline
                      />
                    <Fab
                      size="small"
                      onClick={(event) => {
                        deleteOtherLink(index);
                        event.stopPropagation();
                      }}
                      color="error"
                    >
                      <Delete />
                    </Fab>
                    <Fab
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (index != 0) {
                          moveOtherLinkUp(index);
                        }
                      }}
                      disabled={index == 0}
                    >
                      <ArrowDropUp />
                    </Fab>
                    <Fab
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (index != otherLinks.length - 1) {
                          moveOtherLinkDown(index);
                        }
                      }}
                      disabled={index == otherLinks.length - 1}
                    >
                      <ArrowDropDown />
                    </Fab>
                  </div>}
                {!authToken && <Typography sx={{ textWrap: "balance" }}>
                  <a style={{ textWrap: "balance" }} href={details.link}>
                    {details.name}
                  </a>
                </Typography>}
                </div>
              </li>
            );
          })}
        </ul>
        {authToken && <Button onClick={addOtherLink}>Add Other Link</Button>}
        {info.url && info.url.length > 0 && !authToken && (
          <Typography>
            <a href={info.url}>See Project</a>
          </Typography>
        )}
        {authToken && <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
          <Typography variant="h6">Main Link:</Typography>
          <TextField
            placeholder="main url"
            value={mainUrl}
            onChange={(event) => {
              setMainUrl(event.target.value);
              if (event.target.value.length == 0) {
                replace(undefined, `${path}.url`)
                setMainUrlVisible(false);
              } else {
                replace(event.target.value, `${path}.url`);
                setMainUrlVisible(true);
              }
            }}
            multiline
          />
          <Button color={mainUrlVisible ? "success" : 'warning'} onClick={() => {
            if (mainUrlVisible) {
              setMainUrl('');
              replace(undefined, `${path}.url`);
              setMainUrlVisible(false);
            } else {
              setMainUrl('https://www.yourwebsite.com');
              replace('https://www.yourwebsite.com', `${path}.url`);
              setMainUrlVisible(true);
            }
          }}>{mainUrlVisible ? 'Visible' : 'Invisible'}</Button>
        </div>
        }
      </div>
    </EditableResumeAccordion>
  );
}
