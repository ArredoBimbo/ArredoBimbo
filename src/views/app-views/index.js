import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import Swal from 'sweetalert2';

export const AppViews = () => {

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('email') === 'amministratore@arredobimbo.com') {
      setAuth(true)
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Errore!',
        text: `ATTENZIONE! Non sei abilitato ad accedere.`
      }).then(()=> {
        localStorage.removeItem('email')
        localStorage.removeItem('auth_token')
      })
    }
  })

  return (
    <div>
      {auth &&
        <Suspense fallback={<Loading cover="content" />}>
          <Switch>
            <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
            <Route path={`${APP_PREFIX_PATH}/ecommerce`} component={lazy(() => import(`./e-commerce`))} />
            <Route path={`${APP_PREFIX_PATH}/ordini`} component={lazy(() => import(`./orders`))} />
            <Route path={`${APP_PREFIX_PATH}/gestione-foto`} component={lazy(() => import(`./handle-images`))} />
            <Route path={`${APP_PREFIX_PATH}/info-liste-regalo`} component={lazy(() => import(`./liste-regalo`))} />

            <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
          </Switch>
        </Suspense>
      }
    </div>

  )
}

export default React.memo(AppViews);