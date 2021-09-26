import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/ecommerce`} component={lazy(() => import(`./e-commerce`))} />
        <Route path={`${APP_PREFIX_PATH}/ordini`} component={lazy(() => import(`./orders`))} />
        <Route path={`${APP_PREFIX_PATH}/gestione-foto`} component={lazy(() => import(`./handle-images`))} />
        <Route path={`${APP_PREFIX_PATH}/info-liste-regalo`} component={lazy(() => import(`./liste-regalo`))} />
        
        <Redirect from={`${APP_PREFIX_PATH}`} to={`https://arredobimbo.github.io/Dashboard${APP_PREFIX_PATH}home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);