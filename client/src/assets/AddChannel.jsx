import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid'

export const AddChannel = ({ setCreateType, setIsCreating, setIsEditing, setToggleContainer, type }) => (

<button
    onClick={() => {
      setCreateType(type);
      setIsCreating((prevState) => !prevState);
      setIsEditing(false);
      if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
    }}
type="button"
className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
<PlusIcon aria-hidden="true" className="h-3 w-3" />
</button>
);