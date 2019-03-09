import React from 'react';
export const Footer = () => {
  const date = new Date();
  const copyrightYear = date.getFullYear();
  return (
    <div className="krowdspace-footer text-center">
      <span>&copy; {copyrightYear} Krowdspace </span>
    </div>
  );
};