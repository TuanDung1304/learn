import { useForm } from "react-hook-form";
import "./style.css";
import { withTranslation, Trans, useTranslation } from "react-i18next";

function Form() {
  const {t} = useTranslation('translation');
  
  const { register, handleSubmit, formState: { errors, } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {name: 'Tuan Dung'},
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
          <label>{t("form.name", { framework: "react-i18next" })} <span className="required">*</span></label>
          <input type="text" className="field-long"
            {...register("name", {required: 'Không được bỏ trống', maxLength: 80, pattern: {value: /^[a-zA-Z ]{2,30}$/, message: 'Không đúng định dạng'}})}
          />
          {errors.name && <span className="err">{errors.name.types}</span>}

          <label>Email <span className="required">*</span></label>
          <input type="email" className="field-long"
            {...register("email", {required: 'Không được bỏ trống', 
              pattern: {value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Không đúng định dạng'},
              validate: () => console.log('Email đúng')
            })}
          />
          {errors.email && <span className="err">{errors.email.message}</span>}

          <label>{t("form.phone", { framework: "react-i18next" })} <span className="required">*</span></label>
          <input type="text" className="field-long" 
            {...register("phoneNumber", {required: 'Không được bỏ trống', 
            pattern: {value: /^\d+$/, message: 'Chỉ nhập sô'},
            minLength: {value: 8, message: 'Độ dài 8 đến 12'}, 
            maxLength: {value: 12, message: 'Độ dài 8 đến 12'}, 
            })}
          />
          {errors.phoneNumber && <span className="err">{errors.phoneNumber.message}</span>}

          <label>{t("form.job", { framework: "react-i18next" })}</label>
          <select  className="field-select"> 
            <option value="Doctor">{t("form.jobs.doctor", { framework: "react-i18next" })}</option>
            <option value="Teacher">{t("form.jobs.teacher", { framework: "react-i18next" })}</option>
            <option value="Developer">{t("form.jobs.developer", { framework: "react-i18next" })}</option>
          </select>
          <label>{t("form.message", { framework: "react-i18next" })} <span className="required">*</span></label>
          <textarea id="field5" className="field-long field-textarea"></textarea>
          <input type="submit" value={t("form.submit", { framework: "react-i18next" })} />
      </div>
    </form>
  );
}

export default withTranslation("common")(Form);