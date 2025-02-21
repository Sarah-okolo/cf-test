import { useForm } from 'react-hook-form'
import { Button } from './components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from './components/ui/input-fields'
import { useState } from 'react'

// Form validation schema (zod)
const schema = z.object({
  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(1, 'This field is required'),
  // queryType: z.enum(['option 1', 'option 2'], {required_error: 'Please select a query type'}), // Ensures one of the radio buttons is selected
  // shouldContact: z.object({
  //   checkbox1: z.boolean(),
  // }).refine((data) => Object.values(data).some(Boolean), { //  Ensures at least one of the checkboxes are checked
  //   message: 'To submit this form, please consent to being contacted',
  // }),
  // selectedOption: z.string({ required_error: 'Please select an option' }), // Ensures an option is selected from the dropdown
  dob: z.date({ required_error: 'Please enter your date of birth' }),
  // imageFile: z.custom((value) => value instanceof File, { message: "Please upload an image" }), // Ensures an image is uploaded, stores the file object
  // imageFile: z.custom((value) => value instanceof File, { message: "Please upload an image" }).optional(),
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
      <div className='bg-Neutral-White w-full max-w-[736px] my-0 mx-auto p-9 rounded-lg text-Neutral-Gray-900/95'>
        <h1 className='text-Green-900 font-bold text-3xl mb-9'>Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} autofill='true'>
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
            type='email'
            label='Email'
            labelFor='email'
            labelExtra={<span className="text-Green-600">*</span>}
            placeholder='johndoe@email.com'
            customClass='w-full px-4 py-3 my-2 outline-none border border-red-500 rounded-md focus:border-2 focus:border-Green-600 hover:border-Green-600'
            registerInput={register('email')}
            errMsg={errors.email?.message}
            hasError={!!errors.email}
            fieldErrorStyle='border-Red'
          />

          <InputField
            type='dropdown'
            depCompFile='select.jsx'
            wrapperClass='border'
            label='Select Option'
            labelFor='selectedOption'
            labelExtra={<span className="text-Green-600">*</span>} 
            labelClass=''
            placeholder='Select the type of issue'
            customClass = 'w-1/2 px-4 py-3 my-2 outline-none border border-Neutral-Gray-500 rounded-md focus:border-2 focus:border-Green-600 hover:border-Green-600'
            groupInputs={[
              {
                label: 'Weekdays',
                options: ['Tuesday', 'Monday', 'Sunday']
              },
              {
                label: 'Months',
                options: ['January', 'Feburary', 'March']
              }
            ]}
            subLabelCustomClass='text-xl'
            optionsCustomClass='focus:bg-Green-200'
            registerControl={control}
            errMsg={errors.selectedOption?.message}
            hasError={!!errors.selectedOption}
          />

          <InputField
            type='radioGroup'
            depCompFile='radio-group.tsx'
            wrapperClass='border'
            label='Query Type'
            labelFor='queryType'
            labelClass=''
            labelExtra={<span className="text-Green-600">*</span>}
            customClass=' my-2 flex gap-4 md:justify-between md:gap-5'
            subLabel={['General Enquiry', 'Support Request']}
            // additionalFieldInfoClass='block ml-4 mt-2 text-red-600 text-sm'
            // additionalFieldInfo={['Money reigns and this is all I have to give to you in this world','', 'this is for barber']}
            subLabelCustomClass='p-3 w-full flex flex-row-reverse justify-between border border-Neutral-Gray-500 rounded-md cursor-pointer hover:border-primary'
            groupInputs={['option 1', 'option 2']}
            registerControl={control}
            errMsg={errors.queryType?.message}
            hasError={!!errors.queryType}
            subLabelExtra={<span className="text-Green-600">*</span>}
            focusActiveStyle='bg-buttonSecondary'
          />

          <InputField
            type='file-image'
            wrapperClass='border'
            label='Upload Image'
            labelFor='imageFile'
            labelExtra={<span className="text-Green-600">*</span>}
            labelClass=''
            placeholder='Choose an image'
            customClass='px-2 block w-1/2 gap-4 hover:bg-Green-200 rounded-lg'
            iconStyles={{ fill: 'transparent', strokeWidth: 2, size: 30, color: 'black' }}
            registerControl={control}
            errMsg={errors.imageFile?.message}
            hasError={!!errors.imageFile}
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
            depCompFile='checkbox.jsx'
            wrapperClass='border'
            label='Consent'
            labelFor='shouldContact'
            labelExtra={<span className="text-Green-600">*</span>}
            labelClass=''
            customClass='my-2 flex gap-4'
            subLabel={['I consent to by the team', 'I consent  marketing emails']}
            subLabelExtra={<span className="text-Green-600">*</span>}
            subLabelCustomClass='block cursor-pointer p-3 w-max flex items-center border border-Neutral-Gray-500 rounded-md cursor-pointer hover:border-Green-600'
            additionalFieldInfo={['Money reigns','', 'this is for barber']}
            additionalFieldInfoClass='block ml-4 mt-2 text-red-600 text-sm'
            focusActiveStyle='block cursor-pointer bg-buttonSecondary border-2 border-Green-600'
            groupInputs={['checkbox1']}
            registerControl={control}
            errMsg={errors.shouldContact?.message}
            hasError={!!errors.shouldContact}
            triggerValidation={trigger}
          />

          <InputField
            type='datePicker'
            depCompFile='popover.jsx'
            wrapperClass='border'
            label='Date of Birth'
            labelFor='dob'
            labelExtra={<span className="text-Green-600">*</span>}
            labelClass=''
            placeholder='Select your date of birth'
            customClass='w-1/2 px-4 rounded-lg my-2 flex-row-reverse justify-between'
            calendarCustomClass='rounded-none'
            iconStyles = {{ fill: 'transparent', strokeWidth: 2, size: 30, color: 'black' }}
            dateDropdown={true}
            customDateFormat='dd MMM yyyy' // date-fns format
            disabledDates= {(date) => date > new Date() || date < new Date("1900-01-01")}  // If set to true, Disable all dates except the pre-selected date(if provided) else, apply the custom disabled dates
            preSelectedDate={new Date('2024-12-05')}
            yearsIntoPast = {20}
            yearsIntoFuture = {10}
            registerControl={control}
            errMsg={errors.dob?.message}
            hasError={!!errors.dob}
          />
          

          <Button size='full' disabled={isSubmitting || isSubmitted} type='submit' className={`mt-5 text-md text-white ${isSubmitting || isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}>{ isSubmitting ? 'Submitting...' : 'Submit' }</Button>
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