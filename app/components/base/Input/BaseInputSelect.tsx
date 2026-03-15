/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type BaseInputSelectProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  options?: readonly Option[] | null;
  placeholder?: string;
};

export default function BaseInputSelect<T extends FieldValues>({
  label,
  name,
  register,
  setValue,
  rules,
  error,
  options,
  placeholder,
}: BaseInputSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered =
    options?.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectOption = (opt: Option) => {
    setSearch(opt.label);

    setValue?.(name, opt.value as any, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setOpen(false);
  };

  const clearValue = () => {
    setSearch("");

    setValue?.(name, "" as any, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full" ref={ref}>
      {label && (
        <label className="text-sm font-medium flex items-center gap-1">
          {rules?.required && <span className="text-red-500">*</span>}
          {label}
        </label>
      )}

      {/* hidden input สำหรับ react-hook-form */}
      <input type="hidden" {...register?.(name, rules)} />

      <div className="relative">
        <input
          placeholder={placeholder}
          className={`w-full border rounded-md px-3 py-2 text-sm outline-none
          focus:ring-2 focus:ring-blue-500
          ${search ? "pr-8" : ""}
          ${error ? "border-red-500" : "border-gray-300"}
          `}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />

        {!search && (
          <Image
            className="absolute right-3 top-1/2 -translate-y-1/2"
            src={"/arrow_drop_down.svg"}
            alt="arrow-icon"
            width={16}
            height={16}
          />
        )}

        {/* clear button */}
        {search && (
          <button
            type="button"
            onClick={clearValue}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
          >
            ✕
          </button>
        )}

        {open && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-md">
            {filtered.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className="px-3 py-2 text-sm hover:bg-gray-100 w-full text-left"
                onClick={() => selectOption(opt)}
              >
                {opt.label}
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-400">ไม่พบข้อมูล</div>
            )}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500">
          {error.message || "This field is required"}
        </span>
      )}
    </div>
  );
}
