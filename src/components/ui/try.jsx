<Controller
  name='dod'
  control={control}
  render={({ field }) => {
    return (
      <Popover>
        <PopoverTrigger className={`flex gap-3 p-3 border-2 border-input bg-background w-1/2 px-4 rounded-lg my-2 flex-row-reverse justify-between ${!field.value && "text-muted-foreground"}`} id='dod'>     
          <CalendarIcon fill='transparent' strokeWidth={2} size={30} color='black'/>
          {field.value ? format(field.value, 'P') : <span>DD/MM/YYYY</span>}
        </PopoverTrigger>
        <PopoverContent className={`w-auto p-3 my-1 rounded-none`}>
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => {field.onChange(date)}}
              disabled={(date) => date > new Date()}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={new Date().getFullYear() - 120}
              toYear={new Date().getFullYear() + 0}
              classNames={{
                caption: 'flex justify-center relative items-center pb-2 pt-2',
                caption_label: "hidden",
                caption_dropdowns: 'flex justify-center items-center opacity-90 mx-2',
                dropdown: 'bg-background bg-Background focus:outline-none hover:opacity-70 font-medium px-1',
                dropdown_month: 'text-last-right text-left mr-1',
                dropdown_year: 'text-last-right text-left mr-1',
                vhidden: 'hidden',
              }}
            />
        </PopoverContent>
      </Popover>
    )
  }}
/> 