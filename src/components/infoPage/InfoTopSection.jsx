import { ContactInformation } from "./InfoTopSection/ContactInformation";
import { Summary } from "./InfoTopSection/Summary";

export function InfoTopSection() {
  return (
    <div
      style={{
        gap: "2em",
        textAlign: "center",
        flexWrap: "wrap-reverse",
        justifyContent: "center",
      }}
      className="flexRow"
    >
      <ContactInformation />
      <Summary />
    </div>
  );
}
