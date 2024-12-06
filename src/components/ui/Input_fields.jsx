import { Controller } from 'react-hook-form';
import { Checkbox } from "./checkbox"
import { RadioGroup, RadioGroupItem } from "./radio-group"


function InputField(props) {
  const { label, labelExtra, labelFor, labelClass, placeholder, type, customClass,
          errMsg, hasError, registerInput, fieldErrorStyle, focusActiveStyle,
          groupName, groupInputs, registerControl, triggerValidation,
          subLabel, subLabelExtra, subLabelCustomClass,
          additionalSubLabel, additionalSubLabelClass
        } = props;

  
  return (
    <>
      <div className="mb-5">
        { label && <label htmlFor={labelFor} className={labelClass}>{label} {labelExtra}</label> }
        {
        type === 'text' || type === 'number' || type === 'email' || type === 'password' ?
          <input {...registerInput} type={type} id={labelFor} name={labelFor} placeholder={placeholder} className={`${customClass} ${hasError ? fieldErrorStyle : ''}`} />
        :
        type === 'textarea' ?
          <textarea {...registerInput} id={labelFor} name={labelFor} placeholder={placeholder} className={`${customClass} ${hasError ? fieldErrorStyle : ''}`} /> 
        :
        type === 'radioGroup' ?
          <Controller
            name={labelFor}
            control={registerControl}
            render={({ field }) => (
              <RadioGroup {...field} className={customClass} onValueChange={(value) => field.onChange(value)}>
                {
                  subLabel.map((radioSubLabel, index) => (
                    <label key={index} className={`${subLabelCustomClass} ${field.value === groupInputs[index] ? focusActiveStyle : ""}`}>
                      <RadioGroupItem value={groupInputs[index]} id={labelFor} />
                      <span className="ml-4 relative bottom-[1px]">{radioSubLabel} {subLabelExtra}</span>
                      <span className={additionalSubLabelClass}>{additionalSubLabel}</span>
                    </label>
                  ))
                }
              </RadioGroup>
            )}
          />
        :
        type === 'checkboxGroup' ?
          <div className={customClass}>
            {
              subLabel.map((checkboxSubLabel, index) => (
                <Controller 
                  key={index}
                  name={`${groupName}[${groupInputs[index]}]`}
                  control={registerControl}
                  render={({ field }) => (
                    <label className={`${subLabelCustomClass} ${field.value ? focusActiveStyle : ""}`}>
                      <Checkbox 
                        {...field} 
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          triggerValidation(groupName)
                        }}
                      />
                      <span className="ml-4 relative bottom-[3px]">{checkboxSubLabel} {subLabelExtra}</span>
                      <span className={additionalSubLabelClass}>{additionalSubLabel}</span>
                    </label>
                  )}
                />
              ))
            }
          </div>
        :
          null
        }
        { hasError && <p className="text-red-500 text-sm">{errMsg}</p> }
      </div>
    </>
  )
}

export default InputField