/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import Chat from './chat/Chat'

const DashboardPage: FC = () => (
  <>
   
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      {/* <DashboardPage /> */}
      <Chat />
    </>
  )
}

export {DashboardWrapper}
