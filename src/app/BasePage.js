import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import {Token,host} from './libs/config'
import {AjaxDataShopsCreshop} from './modules/Mpos/__mocks__/ShopsCreshops/mockShopsCreshopLib'
import {Auth} from './libs/config'
import {TitleList} from './modules/Mpos/__mocks__/center/mockTitlenameLib'
import {AjaxDataAside} from '../_metronic/layout/components/aside/__mocks__/mockAsideLib'

const MposPage = lazy(() =>
  import("./modules/Mpos/pages/MposPage")
);


export default function BasePage() {
  
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  const [state,setState]=React.useState('')
  const auth = Auth();
  
  // AjaxDataAside(auth.user.id,auth.authToken,setState);
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/mpos" component={MposPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
