import React from 'react';

interface SidebarSeenImageProps {
  photo: string;
  seen: boolean;
}

const SidebarSeenImage: React.FC<SidebarSeenImageProps> = (props) => {
  return props.seen ? (
    <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
      <img
        className="rounded-full w-full h-full object-cover"
        alt="seenByUser"
        src={props.photo}
      />
    </div>
  ) : null;
};

export default SidebarSeenImage;
