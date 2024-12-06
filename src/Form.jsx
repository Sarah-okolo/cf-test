import { set, useForm } from 'react-hook-form'
import { Button } from './components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from './components/ui/Input_fields'
import { useState } from 'react'

// Form validation schema (zod)
const schema = z.object({
  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(1, 'This field is required'),
  queryType: z.enum(['option 1', 'option 2'], {required_error: "Please select a query type"}), // Ensures one of the radio buttons is selected
  shouldContact: z.object({
    checkbox1: z.boolean(),
  }).refine((data) => Object.values(data).some(Boolean), { //  Ensures at least one of the checkboxes are checked
    message: "To submit this form, please consent to being contacted",
  }),
})


function Form() {
  const { register, control, trigger, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      shouldContact: { checkbox1: false, checkbox2: false, checkbox3: false}, // required to set the default state of the checkboxes
    },
  });
  const { errors, isSubmitting } = formState;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
  }


  return (
    <>
      <div className='bg-Neutral-White w-full max-w-[736px] my-0 mx-auto p-8 rounded-lg text-Neutral-Gray-900/95'>
        <h1 className='text-Green-900 font-bold text-3xl mb-9'>Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='md:flex md:justify-between md:gap-5'>
            <InputField
              type='text'
              wrapperClass='md:w-1/2'
              label='First Name'
              labelFor='firstName'
              labelExtra={<span className="text-Green-600">*</span>}
              labelClass='block'
              placeholder='John'
              customClass='w-full px-4 py-3 my-2 outline-none border border-Neutral-Gray-500 rounded-md focus:border-2 focus:border-Green-600 hover:border-Green-600'
              registerInput={register('firstName')}
              errMsg={errors.firstName?.message}
              hasError={!!errors.firstName}
              fieldErrorStyle='border-Red'
            />

            <InputField
              type='text'
              wrapperClass='md:w-1/2'
              label='Last Name'
              labelFor='lastName'
              labelExtra={<span className="text-Green-600">*</span>}
              labelClass='block'
              placeholder='Doe'
              customClass='w-full px-4 py-3 my-2 outline-none border border-Neutral-Gray-500 rounded-md focus:border-2 focus:border-Green-600 hover:border-Green-600'
              registerInput={register('lastName')}
              errMsg={errors.lastName?.message}
              hasError={!!errors.lastName}
              fieldErrorStyle='border-Red'
            />
          </div>

          <InputField
            type='text'
            label='Email'
            labelFor='email'
            labelExtra={<span className="text-Green-600">*</span>}
            placeholder='johndoe@email.com'
            customClass='w-full px-4 py-3 my-2 outline-none border border-Neutral-Gray-500 rounded-md focus:border-2 focus:border-Green-600 hover:border-Green-600'
            registerInput={register('email')}
            errMsg={errors.email?.message}
            hasError={!!errors.email}
            fieldErrorStyle='border-Red'
          />

          <InputField
            type='radioGroup'
            label='Query Type'
            labelFor='queryType'
            labelExtra={<span className="text-Green-600">*</span>}
            customClass=' my-2 gap-4 md:flex md:justify-between md:gap-5'
            subLabel={['General Enquiry', 'Support Request']}
            subLabelCustomClass='p-3 w-full border border-Neutral-Gray-500 rounded-md cursor-pointer hover:border-Green-600'
            groupInputs={['option 1', 'option 2']}
            registerControl={control}
            errMsg={errors.queryType?.message}
            hasError={!!errors.queryType}
            focusActiveStyle='bg-Green-200 border-2 border-Green-600'
          />

          <InputField
            type='textarea'
            label='Message'
            labelFor='message'
            labelExtra={<span className="text-Green-600">*</span>}
            placeholder='Enter your message here'
            customClass='w-full h-24 resize-none px-4 py-2 mt-2 mb-0 outline-none border border-Neutral-Gray-500 rounded-md focus:border-2 focus:border-Green-600 hover:border-Green-600'
            registerInput={register('message')}
            errMsg={errors.message?.message}
            hasError={!!errors.message}
            fieldErrorStyle='border-Red'
          />

          <InputField
            type='checkboxGroup'
            subLabel={['I consent to being contacted by the team']}
            subLabelExtra={<span className="text-Green-600">*</span>}
            subLabelCustomClass='cursor-pointer'
            groupName='shouldContact'
            groupInputs={['checkbox1']}
            registerControl={control}
            errMsg={errors.shouldContact?.message}
            hasError={!!errors.shouldContact}
            triggerValidation={trigger}
          />
          
          <Button size='full' disabled={isSubmitting || isSubmitted} type='submit' className={`mt-5 ${isSubmitting || isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>{ isSubmitting ? 'Submitting...' : 'Submit' }</Button>
        </form>

        {
          isSubmitted &&
            <div className='w-11/12 max-w-max bg-Green-900/95 text-Neutral-White fixed top-3 left-1/2 py-7 px-8 rounded-xl z-50 translate-x-[-50%]'>
              <p className='font-bold text-lg flex gap-2 mb-2'><img src="/assets/images/icon-success-check.svg" alt="Check icon" /> Message Sent!</p>
              <p className='text-Neutral-White/70'>Thanks for completing the form. We'll be in touch soon!</p>
            </div>
        }
      </div>
    </>
  )
}

export default Form