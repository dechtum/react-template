import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import './SITSelect/css.css'

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control", "form-control-solid", 'SITSelect'];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

export function SITSelect({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  children,
  data = [],
  sublabel,
  useLang,
  handelDelete,
  placeholder,
  setFieldValue,
  ...props
}) {
  // const [field, meta] = useField(props);
  // const { touched, error } = meta;
  const [showOption, setShowOption] = React.useState({
    [field.name]: 'none'
  });
  const [showSelect, setShowSelect] = React.useState({
    [field.name]: field.value || ''
  });

  const handleClick = (name) => {
    setShowOption({
      ...showOption,
      [name]: showOption[name] == 'none' ? 'block' : 'none'
    })
  }
  const handleSelect = (name, id,value) => {
    field.value=id
    setFieldValue([field.name],id)
    setShowSelect({
      ...showSelect,
      [name]: id
    })
    setShowOption({
      ...showOption,
      [name]:'none'
    })
  }
 
  const [o] = data.filter(e=>e.id == showSelect[field.name])
 
  return (
    <>
      {label}
      <ul
        className={getFieldCSSClasses(touched, errors)}
        {...field}
        {...props}
      >
        <div className="d-flex justify-content-start" style={{lineHeight:'1.8'}}>
            <div  className="p-2 w-100" onClick={() => handleClick(field.name)}>
            {o==undefined?placeholder:o.name}
            </div>
           
        </div>
        <div style={{ display: showOption[field.name] }}>
          {data.length > 0
            ? data.map((val, key) => {
              return (
                <li style={{pointerEvents:o==undefined?'auto':(o.id==val.id?'none':'auto')}} key={key} value={val.id} onClick={() => handleSelect(field.name, val.id, val.name)}>
                  <div className="d-flex justify-content-start">
                    <div className="p-2 w-100">
                      {useLang == 'en' ?(o==undefined?val.name:<a style={{color:o.id==val.id?'red':''}}>{val.name}</a>)  : (o==undefined?val.name:<a style={{color:o.id==val.id?'red':''}}>{val.name}</a>)}
                    </div>
                    <div className="p-2 flex-shrink-1">
                      <a className="text-dranger " onClick={() => handelDelete(val.id, key,val.name,field.name)}>ลบ</a>
                    </div>
                  </div>
                </li>
              )
            })
            : ''
          }
        </div>
      </ul>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          erros={errors}
          touched={touched}
          label={label}
          sublabel={sublabel}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
