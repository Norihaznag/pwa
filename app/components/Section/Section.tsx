const Section = ({ layout, id, className, children }: any) => {
  return (
    <div id={id} className={`min-h-fit ${layout} ${className}`}>
      {children}
    </div>
  );
};

export default Section;
