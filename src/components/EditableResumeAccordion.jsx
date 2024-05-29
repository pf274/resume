import { useTheme } from "@emotion/react";
import { ArrowDropDown, Info } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useResumeContext } from "../contexts/ResumeContext";
import { EditableTypography } from "./EditableTypography";
import { useState } from "react";

function Break() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <div
      className="accordion-break"
      style={{
        width: "2em",
        height: "0.2em",
        borderRadius: "1em",
        backgroundColor: isDark ? "gray" : "black",
        alignSelf: "center",
      }}
    />
  );
}

export function EditableResumeAccordion({
  title,
  title2,
  titlePath,
  title2Path,
  subtitlePath,
  startDatePath,
  endDatePath,
  subtitle,
  startDateString,
  endDateString,
  children,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [startDate, setStartDate] = useState(new Date(startDateString));
  const [endDate, setEndDate] = useState(new Date(endDateString));
  const [tooltipShown, setTooltipShown] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);
  const { authToken, replace } = useResumeContext();
  function printDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  function handleChangeStartDate(event) {
    const newDate = new Date(event.target.value);
    const asString = newDate.toISOString().split("T")[0];
    replace(asString, startDatePath);
    setStartDate(newDate);
  }
  function handleChangeEndDate(event) {
    const newDate = new Date(event.target.value);
    const asString = newDate.toISOString().split("T")[0];
    replace(asString, endDatePath);
    setEndDate(newDate);
  }
  function isMobileDevice() {
    return (
      typeof window.matchMedia !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    );
  }
  return (
    <Accordion sx={{ padding: "1.5em", maxWidth: "100%" }}>
      <AccordionSummary expandIcon={<ArrowDropDown fontSize="large" />}>
        <div className="resume-accordion-header">
          <div className="resume-accordion-header-left">
            <div style={{ display: "flex", gap: "1em" }} className="accordionTitles">
              <EditableTypography
                typographyVariant="h5"
                value={title}
                path={titlePath}
                placeholder="title"
                multiline
              />
              {title2 && <Break />}
              {title2 && (
                <EditableTypography
                  typographyVariant="h5"
                  typographyStyle={{ color: isDark ? "plum" : "#CC00BB" }}
                  value={title2}
                  path={title2Path}
                  placeholder="title 2"
                  multiline
                />
              )}
            </div>
            {subtitle && (
              <EditableTypography
                typographyVariant="subtitle"
                value={subtitle}
                path={subtitlePath}
                multiline
                placeholder="subtitle"
              />
            )}
          </div>
          {!authToken ? (
            <Typography
              variant="h5"
              color={isDark ? "lightgreen" : "green"}
              className="resume-date-range"
            >
              {`${printDate(startDate)} - ${
                endDate >= new Date() ? "Present" : printDate(endDate)
              }`}
            </Typography>
          ) : (
            <div>
              <Typography>
                <strong>Start Date:</strong>
              </Typography>
              <input
                type="date"
                value={startDate.toISOString().split("T")[0]}
                onChange={handleChangeStartDate}
                onBlur={() => {
                  if (endDate < startDate) {
                    setEndDate(startDate);
                    replace(startDate.toISOString().split("T")[0], endDatePath);
                  }
                }}
                style={{
                  backgroundColor: isDark ? "black" : "white",
                  color: isDark ? "white" : "black",
                  padding: "0.5em",
                  border: "1px solid white",
                  borderRadius: "0.5em",
                }}
                onClick={(event) => event.stopPropagation()}
              />
              <Typography sx={{ marginTop: "1em" }}>
                <strong>End Date:</strong>
              </Typography>
              <input
                type="date"
                value={endDate.toISOString().split("T")[0]}
                onChange={handleChangeEndDate}
                onBlur={() => {
                  if (startDate > endDate) {
                    setStartDate(endDate);
                    replace(endDate.toISOString().split("T")[0], startDatePath);
                  }
                }}
                style={{
                  backgroundColor: isDark ? "black" : "white",
                  color: isDark ? "white" : "black",
                  padding: "0.5em",
                  border: "1px solid white",
                  borderRadius: "0.5em",
                }}
                onClick={(event) => event.stopPropagation()}
              />
              <Tooltip
                title="If the end date is after the current date, it will be displayed as 'Present'"
                open={tooltipShown}
                onClose={() => {
                  if (isMobileDevice()) {
                    console.log("Mobile device, not closing tooltip");
                    return;
                  }
                  setTooltipShown(false);
                  if (tooltipTimeout) {
                    clearTimeout(tooltipTimeout);
                    setTooltipTimeout(null);
                  }
                }}
                onOpen={() => setTooltipShown(true)}
                placement="bottom"
                color="primary"
              >
                <IconButton
                  onClick={(event) => {
                    if (!tooltipShown) {
                      if (tooltipTimeout) {
                        clearTimeout(tooltipTimeout);
                      }
                      setTooltipTimeout(
                        setTimeout(() => {
                          setTooltipShown(false);
                        }, 3500)
                      );
                    } else if (tooltipTimeout) {
                      clearTimeout(tooltipTimeout);
                      setTooltipTimeout(null);
                    }
                    setTooltipShown((prev) => !prev);
                    event.stopPropagation();
                  }}
                >
                  <Info />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
