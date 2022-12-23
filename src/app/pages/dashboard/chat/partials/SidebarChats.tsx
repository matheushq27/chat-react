import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import { usersTypeFriend, arrayUserFriend } from '../../../../types/users'
import {io} from 'socket.io-client'
import { useState, useEffect } from 'react'


function SidebarChats({users}: any)
{
    return(
        <div className='card card-flush'>
          <div className='card-header pt-7' id='kt_chat_contacts_header'>
            <form className='w-100 position-relative' autoComplete='off'>
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
              />

              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                placeholder='Search by username or email...'
              />
            </form>
          </div>
          <div className='card-body pt-5' id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-5 h-200px h-lg-auto'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
             {users &&
             
             users.map((user: arrayUserFriend)=>{
                return(
                  <div key={user.name}>
                  <div className='d-flex flex-stack py-4'>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px symbol-circle'>
                      <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                        M
                      </span>
                    </div>

                    <div className='ms-5'>
                      <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                      {user.name}
                      </a>
                      <div className='fw-bold text-gray-400'>{user.email}</div>
                    </div>
                  </div>

                  <div className='d-flex flex-column align-items-end ms-2'>
                    <span className='text-muted fs-7 mb-1'>5 hrs</span>
                  </div>
                </div>
                <div className='separator separator-dashed d-none'></div>
                </div>
                )
              })
            }

            </div>
          </div>
        </div>
    )
}

export default SidebarChats