/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import requestUsersApi from '../../../Api/requestUsers'
import { usersType } from '../../../types/users'

// const initialValues = {
//   firstname: '',
//   lastname: '',
//   email: '',
//   password: '',
//   changepassword: '',
//   acceptTerms: false,
// }

const initialValues = {
  user: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}
const registrationSchema = Yup.object().shape({
  user: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('O usuário é obrigatório'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email é obrigatório'),
  surname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('O sobrenome é obrigatório'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('A senha é obrigatória'),
  changepassword: Yup.string()
    .required('A confirmação da senha é obrigatória')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Senha e Confirmar senha não correspondem"),
    }),
  acceptTerms: Yup.bool().required('Você deve aceitar os Termos e Condições'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      console.log('ENtrou')
      const objUser = {
        name: values.name, 
        surname: values.surname,
        user: values.user, 
        email: values.email, 
        password: values.password
      }

      setLoading(true)
      try {
        // const {data: auth} = await register(
        //   values.email,
        //   values.name,
        //   values.surname,
        //   values.password,
        //   values.changepassword
        // )
        
        const resp = await createUsers(objUser)
        setLoading(false)
        saveAuth(resp)
        // const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(resp)
        console.log(resp)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('Os dados cadastrais estão incorretos')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  async function createUsers(users: usersType){
    const response = await requestUsersApi.createUsers(users)
    return response
  }


  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Cadastro</h1>
        {/* end::Title */}
      </div>
      {/* end::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group User */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Usuário</label>
        <input
          placeholder='Usuário'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('user')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.user && formik.errors.user,
            },
            {
              'is-valid': formik.touched.user && !formik.errors.user,
            }
          )}
        />
        {formik.touched.user && formik.errors.user && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.user}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Firstname */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Nome</label>
        <input
          placeholder='Nome'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('name')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.name && formik.errors.name,
            },
            {
              'is-valid': formik.touched.name && !formik.errors.name,
            }
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.name}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Sobrenome</label>
        <input
          placeholder='Sobrenome'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('surname')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.surname && formik.errors.surname,
            },
            {
              'is-valid': formik.touched.surname && !formik.errors.surname,
            }
          )}
        />
        {formik.touched.surname && formik.errors.surname && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.surname}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Senha</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Senha'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
        Use 8 ou mais caracteres com uma mistura de letras, números e símbolos.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirmar senha</label>
        <input
          type='password'
          placeholder='Confirmar senha'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            Eu aceito os{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Termos
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Cadastrar</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Aguarde por favor...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancelar
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
