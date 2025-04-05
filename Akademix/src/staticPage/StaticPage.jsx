import React from 'react';

const StaticPage = ({ file }) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <iframe
        src={`/${file}.html`}
        title={file}
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default StaticPage;
