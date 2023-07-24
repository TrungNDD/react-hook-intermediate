import classNames from "classnames";
import { useState } from "react";

function AccordionItem({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3 className={classNames("m-2 uppercase", {"font-bold": isOpen})} onClick={() => setIsOpen((prev) => !prev)}>{label}</h3>
      <div
        className={classNames("accordion-detail grid grid-cols-2 md:grid-cols-4 gap-4", isOpen ? "block mb-4" : "hidden")}
      >
        {children}
      </div>
    </div>
  );
}

export default AccordionItem;
