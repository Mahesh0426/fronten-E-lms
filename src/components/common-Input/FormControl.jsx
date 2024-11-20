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
