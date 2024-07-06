import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export const CloseCreateChannel = ({ setIsCreating, setIsEditing }) => (
  <button
    onClick={() => {
      if (setIsCreating) setIsCreating(false);
      if (setIsEditing) setIsEditing(false);
    }}
    type="button"
    className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
  </button>
);
