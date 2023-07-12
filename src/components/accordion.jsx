import classNames from "classnames";
import { useState } from "react";

function Accordion({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h3 onClick={() => setIsOpen((prev) => !prev)}>{label}</h3>
      <div
        className={classNames("accordion-detail", isOpen ? "block" : "hidden")}
      >
        {children}
      </div>
    </>
  );
}

export default Accordion;
