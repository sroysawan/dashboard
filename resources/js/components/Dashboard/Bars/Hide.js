import { useState } from "react";

export default function Hide() {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
        <input
          type="checkbox"
          id="topping"
          name="topping"
          value="Hiding"
          checked={isChecked}
          onChange={handleOnChange} 
        />
              Hide unassigned machines (ซ่อนเครื่องไม่มีงาน)

      {/* <div className="result">
        Above checkbox is {isChecked ? "checked" : "unchecked"}.
      </div> */}
    </>
  );
}