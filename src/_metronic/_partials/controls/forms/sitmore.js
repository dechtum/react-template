import React from "react";

export function SITMore({Label,gap="pb-0", ...props}) {

  return (
    <>
    <div style={{zIndex:'100'}} className={`position-absolute fixed-bottom text-right pr-5  ${gap}`}><small><a className="text-primary" {...props}>เพิ่มเติม</a></small></div>
    </>    
  );
}
