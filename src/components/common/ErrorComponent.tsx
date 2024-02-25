import React from 'react';

const ErrorComponent = ({ message }: { message?: string }) => {
  return (
    <div>
      Failed to fetch data. {message}
    </div>
  );
};

export default ErrorComponent;