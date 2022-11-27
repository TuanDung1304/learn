import { useForm } from "react-hook-form";
import "./style.css";
export default function Form() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {/*name: 'Tuan Dung'*/},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined
  })

  const onSubmit = data => console.log('data: ', data);
  console.log('error: ', errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-style-1">
          <label>Full Name <span className="required">*</span></label>
          <input type="text" className="field-long"
            {...register("name", {required: 'Không được bỏ trống', maxLength: 80})}
          />
          {errors.name && <span className="err">{errors.name.message}</span>}

          <label>Email <span className="required">*</span></label>
          <input type="email" className="field-long"
            {...register("email", {required: 'Không được bỏ trống', 
              pattern: {value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Không đúng định dạng'},
              validate: () => console.log('Email đúng')
            })}
          />
          {errors.email && <span className="err">{errors.email.message}</span>}

          <label>Phone number <span className="required">*</span></label>
          <input type="text" className="field-long" 
            {...register("phoneNumber", {required: 'Không được bỏ trống', 
            minLength: {value: 8, message: 'Độ dài 8 đến 12'}, 
            maxLength: {value: 12, message: 'Độ dài 8 đến 12'}, 
            pattern: {value: /\d+/, message: 'Chỉ nhập sô'}})}
          />
          {errors.phoneNumber && <span className="err">{errors.phoneNumber.message}</span>}

          <label>Subject</label>
          <select className="field-select">
            <option value="Advertise">Advertise</option>
            <option value="Partnership">Partnership</option>
            <option value="General Question">General</option>
          </select>
          <label>Your Message <span className="required">*</span></label>
          <textarea id="field5" className="field-long field-textarea"></textarea>
          <input type="submit" value="Submit" />
      </div>
    </form>
  );
}
