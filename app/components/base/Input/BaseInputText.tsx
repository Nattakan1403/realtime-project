"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type BaseInputTextProps<T extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name: Path<T>;
    register?: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    error?: FieldError;
    icon?: React.ReactNode;
  };

function BaseInputTextInner<T extends FieldValues>(
  {
    label,
    name,
    register,
    rules,
    error,
    icon,
    className,
    ...props
  }: BaseInputTextProps<T>,
  ref: React.Ref<HTMLInputElement>,
) {
  const registerProps = register ? register(name, rules) : {};

  return (
    <div className={`flex flex-col gap-1 w-full ${className ?? ""}`}>
      {label && (
        <label className="text-sm font-medium flex items-center gap-1">
          {rules?.required && <span className="text-red-500">*</span>}
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}

        <input
          ref={ref}
          {...registerProps}
          {...props}
          className={`w-full border rounded-md px-3 py-2 text-sm outline-none
          focus:ring-2 focus:ring-blue-500
          ${icon ? "pl-9" : ""}
          ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
      </div>

      {error && (
        <span className="text-xs text-red-500">
          {error.message || "This field is required"}
        </span>
      )}
    </div>
  );
}

const BaseInputText = forwardRef(BaseInputTextInner) as <T extends FieldValues>(
  props: BaseInputTextProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => ReturnType<typeof BaseInputTextInner>;

export default BaseInputText;
