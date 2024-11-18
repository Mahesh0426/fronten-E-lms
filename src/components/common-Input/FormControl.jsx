// import React from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";

// const FormControl = (props) => {
//   const { formControls = [], formData, handleOnChange } = props;

//   //   // Function to update formData
//   //   const handleOnChange = (name, value) => {
//   //     setFormData({ ...formData, [name]: value });
//   //   };

//   // Function to render the appropriate component based on the componentType
//   const renderComponent = ({
//     componentType,
//     name,
//     placeholder,
//     type,
//     label,
//     options = [],
//   }) => {
//     // Get the current value from formData
//     const value = formData[name] || "";

//     switch (componentType) {
//       case "input":
//         return (
//           <Input
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             type={type}
//             value={value}
//             onChange={handleOnChange}
//           />
//         );
//       case "select":
//         return (
//           <Select
//             value={value}
//             nValueChange={(val) =>
//               handleOnChange({ target: { name, value: val } })
//             }
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={label} />
//             </SelectTrigger>
//             <SelectContent>
//               {options.map(({ id, label }) => (
//                 <SelectItem key={id} value={id}>
//                   {label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );
//       case "textarea":
//         return (
//           <Textarea
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             onChange={handleOnChange}
//             as="textarea"
//           />
//         );
//       default:
//         return (
//           <Input
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             type={type}
//             value={value}
//             onChange={handleOnChange}
//           />
//         );
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {formControls.map((controlItem) => (
//         <div key={controlItem.name}>
//           <Label htmlFor={controlItem.name}>{controlItem.label}</Label>

//           {/* Render the appropriate form control (input/select/textarea) */}
//           {renderComponent(controlItem)}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FormControl;
/* eslint-disable react/prop-types */
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FormControl = (props) => {
  const { label, inputAttributes, handleOnChange, options = [] } = props;

  if (inputAttributes.type === "select") {
    return (
      <div className="mb-4">
        <Label htmlFor={inputAttributes.id} className="block font-bold mb-2">
          {label}
        </Label>
        <Select
          value={inputAttributes.value || ""}
          onValueChange={(value) =>
            handleOnChange({ target: { name: inputAttributes.name, value } })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={inputAttributes.name} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (inputAttributes.type === "textarea") {
    return (
      <div className="mb-4">
        <Label htmlFor={inputAttributes.id} className="block font-bold mb-2">
          {label}
        </Label>
        <Textarea
          {...inputAttributes}
          value={inputAttributes.value || ""}
          onChange={(e) => handleOnChange(e)}
          className="w-full p-2 border rounded-md"
        />
      </div>
    );
  }

  return (
    <div className="mb-4 ">
      <Label
        htmlFor={inputAttributes.id}
        className="block text-sm font-medium text-gray-900 "
      >
        {label}
      </Label>

      <Input
        {...inputAttributes}
        value={inputAttributes.value || ""}
        onChange={(e) => handleOnChange(e)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 focus-visible:z-10 sm:text-sm/6"
      />
    </div>
  );
};

export default FormControl;
